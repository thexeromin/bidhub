import GuestGuard from '@/components/auth/GuestGuard'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Wrap the entire layout in the Guard
    <GuestGuard>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/40 py-12">
        {children}
      </div>
    </GuestGuard>
  )
}
