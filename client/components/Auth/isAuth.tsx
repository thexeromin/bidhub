'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const { status } = useSession()

        useEffect(() => {
            if (status !== 'authenticated') return redirect('/signin')
        }, [])

        if (status !== 'authenticated') return redirect('/signin')

        return <Component {...props} />
    }
}
