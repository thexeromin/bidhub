'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { Loader2 } from 'lucide-react'

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // If we are done loading and the user IS logged in...
    if (!isLoading && isAuthenticated) {
      // ...redirect them to the dashboard immediately.
      router.replace('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  // While checking, show a loader (prevents the Login form from flashing)
  if (isLoading || isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-muted/40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If NOT logged in, show the Login/Signup form
  return <>{children}</>
}
