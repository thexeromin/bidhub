'use client'

import { useState, useEffect } from 'react'
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
    InputRightElement,
    Checkbox,
    Stack,
    Button,
    Heading,
    useToast,
    useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Base from '@/components/Base'
import { signInAction } from '@/auth.action'

interface Inputs {
    email: string
    password: string
}

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false)

    const router = useRouter()
    const { status } = useSession()
    const toast = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await signInAction(data)
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Invalid email or password',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            })
        }
    }

    // check for authentication
    useEffect(() => {
        if (status === 'authenticated') router.push('/dashboard')
    }, [status])

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
                            Sign in to your account
                        </Heading>
                        <Stack
                            spacing={4}
                            as="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <FormControl
                                id="email"
                                isInvalid={errors.email ? true : false}
                            >
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    isDisabled={isLoading}
                                    {...register('email', {
                                        required: 'Email is required',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id="password"
                                isInvalid={errors.password ? true : false}
                            >
                                <FormLabel>password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        isDisabled={isLoading}
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

                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                    {/* <Text color={'blue.400'}>
                                        Forgot password?
                                    </Text> */}
                                </Stack>
                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    isLoading={isLoading}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Base>
    )
}
