'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import Auth from '../layout/auth'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signupUser } from '@/app/hooks/mutations'

const FormSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    phone: z.string().regex(/^\+91\d{10}$/, {
        message: 'Invalid Indian phone number',
    }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
})

const RegisterForm: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
    className,
    ...props
}) => {
    const router = useRouter()
    const signupMutation = signupUser(() =>
        setTimeout(() => {
            router.push('/login')
        }, 2000),
    )
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            phone: '',
            password: '',
        },
    })

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
        data,
    ) => {
        signupMutation.mutate(data)
        form.reset()
    }

    return (
        <Auth
            title="Register"
            subtitle="Enter your details below to create a new account"
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
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                    <FormLabel>Password</FormLabel>
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
                            disabled={signupMutation.isPending}
                        >
                            {signupMutation.isPending ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Register'
                            )}
                        </Button>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="underline underline-offset-4"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </Form>
        </Auth>
    )
}

export default RegisterForm
