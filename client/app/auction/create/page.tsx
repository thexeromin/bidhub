'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
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
    Heading,
    useToast,
    useColorModeValue,
} from '@chakra-ui/react'
import Base from '@/components/Base'
import { isAuth } from '@/components/Auth'
import { createAuctionAPI } from '@/api/auction'

interface Inputs {
    title: string
    description: string
}

function CreateAuction() {
    const session = useSession()

    const toast = useToast()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isLoading },
    } = useForm<Inputs>()
    const { trigger, isMutating } = useSWRMutation(
        'auction',
        createAuctionAPI,
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

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (session.data?.accessToken) {
            trigger({ body: data, token: session.data?.accessToken })
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
