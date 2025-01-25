'use client'

import { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
import { useDropzone, DropzoneOptions, DropzoneState } from 'react-dropzone'
import { useSession } from 'next-auth/react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Stack,
    Button,
    Textarea,
    Text,
    VStack,
    Heading,
    useToast,
    useColorModeValue,
} from '@chakra-ui/react'
import Base from '@/components/Base'
import { isAuth } from '@/components/Auth'
import { handlePostReq } from '@/services'

interface Inputs {
    title: string
    description: string
    photo: string
}

function CreateAuction() {
    const [files, setFiles] = useState<File[]>([])

    const session = useSession()
    const toast = useToast()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isLoading },
    } = useForm<Inputs>()
    const { trigger, isMutating } = useSWRMutation<
        any,
        any,
        [string, string] | null,
        FormData,
        any
    >(
        session.data?.accessToken
            ? [`auction`, session.data.accessToken]
            : null,
        ([url, token], body) => handlePostReq<FormData, any>(url, token, body.arg),
        {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Auction created.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                })
                reset()
            },
            onError: (err) => {
                toast({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                })
            },
        },
    )

    const onDrop = useCallback<NonNullable<DropzoneOptions['onDrop']>>(
        (acceptedFiles: File[]) => {
            // Do something with the files
            console.log(acceptedFiles)
            setFiles(acceptedFiles)
        },
        [],
    )

    // Use useDropzone with the onDrop function
    const { getRootProps, getInputProps, isDragActive }: DropzoneState =
        useDropzone({ onDrop })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (session.data?.accessToken) {
            const formData = new FormData()

            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('photo', files[0])

            trigger(formData)
        } else {
            toast({
                title: 'Error',
                description: 'Your session expired.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            })
        }
    }

    // Define styles using useColorModeValue
    const borderColor = useColorModeValue('gray.300', 'gray.600')
    const activeBorderColor = useColorModeValue('blue.400', 'blue.500')
    const bgColor = useColorModeValue('gray.100', 'gray.700')
    const color = useColorModeValue('gray.600', 'gray.300')
    const fileBgColor = useColorModeValue('gray.200', 'gray.600')
    const fileColor = useColorModeValue('black', 'white')

    return (
        <Base>
            <Flex minH={'90vh'} align={'center'} justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Heading fontSize={'2xl'} mb={5}>
                            Create Auction
                        </Heading>
                        <Stack
                            spacing={4}
                            as="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <FormControl
                                id="auction_title"
                                isInvalid={errors.title ? true : false}
                            >
                                <FormLabel>Auction title</FormLabel>
                                <Input
                                    type="title"
                                    isDisabled={isLoading || isMutating}
                                    {...register('title', {
                                        required: 'Auction title is required',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.title && errors.title.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id="auction_description"
                                isInvalid={errors.description ? true : false}
                            >
                                <FormLabel>Auction description</FormLabel>
                                <Textarea
                                    isDisabled={isLoading || isMutating}
                                    {...register('description', {
                                        required:
                                            'Auction description is required',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.description &&
                                        errors.description.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id="auction-photo"
                                isInvalid={errors.photo ? true : false}
                            >
                                <FormLabel>Upload auction banner</FormLabel>
                                <Box
                                    {...getRootProps()}
                                    borderWidth="2px"
                                    borderRadius="md"
                                    borderStyle="dashed"
                                    p={5}
                                    bg={isDragActive ? 'gray.50' : bgColor}
                                    color={color}
                                    borderColor={
                                        isDragActive
                                            ? activeBorderColor
                                            : borderColor
                                    }
                                    _hover={{ borderColor: activeBorderColor }}
                                    transition="border 0.24s ease-in-out"
                                    textAlign="center"
                                    cursor="pointer"
                                >
                                    <input {...getInputProps()} />
                                    <Text fontSize="md" mb={4}>
                                        {isDragActive
                                            ? 'Drop the files here ...'
                                            : "Drag 'n' drop some files here, or click to select files"}
                                    </Text>
                                    <VStack spacing={2} align="stretch">
                                        {files.map((file) => (
                                            <Box
                                                key={file.name}
                                                bg={fileBgColor}
                                                p={2}
                                                borderRadius="md"
                                                color={fileColor}
                                                width="100%"
                                            >
                                                <Text isTruncated>
                                                    {file.name}
                                                </Text>
                                            </Box>
                                        ))}
                                    </VStack>
                                </Box>

                                <FormErrorMessage>
                                    {errors.photo && errors.photo.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Stack spacing={10} mt={3}>
                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    isLoading={isMutating || isLoading}
                                >
                                    Create Auction
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Base>
    )
}

export default isAuth(CreateAuction)
