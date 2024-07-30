'use client'

import { useState, useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    Textarea,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Base from '@/components/Base'
import ChakraNextLink from '@/components/ChakraNextLink'
import { signupAPI } from '@/api'

interface Inputs {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    password: string
}

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)

    const router = useRouter()
    const { status } = useSession()
    const toast = useToast()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    const { trigger, isMutating } = useSWRMutation(
        'auth/local/signup',
        signupAPI,
        {
            onSuccess: () => {
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
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

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        trigger({ body: data })
    }

    // check for authentication
    useEffect(() => {
        if (status === 'authenticated') router.push('/dashboard')
    }, [status])

    return (
        <Base>
            <Flex minH={'100vh'} align={'center'} justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Heading fontSize={'2xl'} mb={5}>
                            Register your account
                        </Heading>

                        <Stack
                            spacing={4}
                            as="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <HStack>
                                <Box>
                                    <FormControl
                                        id="firstName"
                                        isInvalid={
                                            errors.firstName ? true : false
                                        }
                                    >
                                        <FormLabel>Frist Name</FormLabel>
                                        <Input
                                            type="text"
                                            isDisabled={isMutating}
                                            {...register('firstName', {
                                                required:
                                                    'Frist name is required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors.firstName &&
                                                errors.firstName.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl
                                        id="lastName"
                                        isInvalid={
                                            errors.lastName ? true : false
                                        }
                                    >
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            type="text"
                                            isDisabled={isMutating}
                                            {...register('lastName', {
                                                required:
                                                    'Last name is required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors.lastName &&
                                                errors.lastName.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </HStack>

                            <FormControl
                                id="email"
                                isInvalid={errors.email ? true : false}
                            >
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="text"
                                    isDisabled={isMutating}
                                    {...register('email', {
                                        required: 'Email is required',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id="phone"
                                isInvalid={errors.phone ? true : false}
                            >
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    type="text"
                                    isDisabled={isMutating}
                                    {...register('phone', {
                                        required: 'Phone is required',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.phone && errors.phone.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id="password"
                                isInvalid={errors.password ? true : false}
                            >
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        isDisabled={isMutating}
                                        {...register('password', {
                                            required: 'Password is required',
                                        })}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword(
                                                    (showPassword) =>
                                                        !showPassword,
                                                )
                                            }
                                        >
                                            {showPassword ? (
                                                <ViewIcon />
                                            ) : (
                                                <ViewOffIcon />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id="address"
                                isInvalid={errors.address ? true : false}
                            >
                                <FormLabel>Address</FormLabel>
                                <Textarea
                                    isDisabled={isMutating}
                                    {...register('address', {
                                        required: 'Address is required',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.address && errors.address.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    isLoading={isMutating}
                                    size="lg"
                                    colorScheme="blue"
                                    type="submit"
                                >
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user?{' '}
                                    <ChakraNextLink
                                        color={'blue.400'}
                                        href="/signin"
                                    >
                                        Login
                                    </ChakraNextLink>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Base>
    )
}
