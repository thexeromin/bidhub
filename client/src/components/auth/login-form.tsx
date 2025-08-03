'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { toast } from 'sonner'
import { Button } from '../ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Auth from '../layout/auth'

const FormSchema = z.object({
    email: z.email('Invalid email address. Please provide a valid email.'),
    password: z.string().min(3, 'Password must be at least 3 characters long.'),
})

const LoginForm: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
    className,
    ...props
}) => {
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
        data,
    ) => {
        const res = await signIn('credentials', { ...data, redirect: false })
        if (res?.ok) {
            router.push('/dashboard')
        } else if (res?.error === 'CredentialsSignin') {
            toast('Error!', {
                description: 'Invalid credentials. Please try again.',
            })
        } else if (res?.error) {
            console.log({ err: res?.error })
        }
    }

    return (
        <Auth
            title="Login"
            subtitle="Enter your email below to login to your account"
            className={className}
            {...props}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="m@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Link
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            variant="brand"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full disabled:cursor-not-allowed"
                            disabled
                        >
                            Login with Google
                        </Button>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/register"
                            className="underline underline-offset-4"
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </Form>
        </Auth>
    )
}

export default LoginForm
