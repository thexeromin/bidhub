'use client'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function Header() {
    const { status } = useSession()
    const [menuOpen, setMenuOpen] = useState(false)
    const links = [
        { url: '/', text: 'Home' },
        { url: '/listings', text: 'Listings' },
        { url: '/categories', text: 'Categories' },
    ]

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-indigo-600">
                    <Link href="/">Bidhub</Link>
                </h1>
                <nav className="hidden md:flex space-x-8">
                    {links.map((link, idx) => (
                        <Link
                            href={link.url}
                            className="hover:text-indigo-600 capitalize"
                            key={link.text + idx}
                        >
                            {link.text}
                        </Link>
                    ))}

                    {status === 'authenticated' ? (
                        <Button
                            variant="brand"
                            size="sm"
                            onClick={() => signOut()}
                        >
                            Signout
                        </Button>
                    ) : (
                        <Link
                            href="/login"
                            className="hover:text-indigo-600 capitalize"
                        >
                            Login
                        </Link>
                    )}
                </nav>
                <button
                    className="md:hidden text-2xl text-indigo-600 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? '✖' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    {links.map((link, idx) => (
                        <Link
                            href={link.url}
                            className="block text-gray-700 hover:text-indigo-600"
                            key={link.text + idx}
                        >
                            {link.text}
                        </Link>
                    ))}
                    {status === 'authenticated' ? (
                        <Button
                            variant="brand"
                            size="sm"
                            onClick={() => signOut()}
                        >
                            Signout
                        </Button>
                    ) : (
                        <Link
                            href="/login"
                            className="block text-gray-700 hover:text-indigo-600"
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </header>
    )
}
