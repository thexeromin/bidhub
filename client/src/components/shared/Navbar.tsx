import Link from 'next/link'
import { Gavel, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModeToggle } from './ModeToggle'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Gavel className="h-6 w-6 text-primary" />
            <span>BidMaster</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/auctions"
              className="transition-colors hover:text-primary"
            >
              Auctions
            </Link>
            <Link
              href="/auction/create"
              className="transition-colors hover:text-primary"
            >
              Sell
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-primary"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Search Bar (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-sm ml-8">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for items..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[300px]"
            />
          </div>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          <Link href="/signin">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>

          <Link href="/signup">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
