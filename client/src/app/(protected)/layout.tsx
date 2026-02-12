'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { Loader2 } from 'lucide-react'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  // 1. Check Auth State from Zustand
  const { isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    // 2. If finished loading and NOT authenticated, kick them out
    if (!isLoading && !isAuthenticated) {
      router.replace('/signin')
    }
  }, [isLoading, isAuthenticated, router])

  // 3. While checking, show a loading spinner (prevents "flash" of content)
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // 4. If not authenticated (and redirect hasn't happened yet), show nothing
  if (!isAuthenticated) {
    return null
  }

  // 5. If authenticated, render the page
  return <>{children}</>
}
