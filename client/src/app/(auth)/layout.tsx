import Header from '@/components/layout/header'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const AuthLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const session = await getServerSession(authOptions)
    if (session) redirect('/dashboard')

    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default AuthLayout
