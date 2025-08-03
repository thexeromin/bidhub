'use client'
import { useState } from 'react'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-indigo-600">Bidhub</h1>
                <nav className="hidden md:flex space-x-8">
                    <a href="#" className="hover:text-indigo-600">
                        Home
                    </a>
                    <a href="#" className="hover:text-indigo-600">
                        Listings
                    </a>
                    <a href="#" className="hover:text-indigo-600">
                        Categories
                    </a>
                    <a href="/login" className="hover:text-indigo-600">
                        Login
                    </a>
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
                    <a
                        href="#"
                        className="block text-gray-700 hover:text-indigo-600"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="block text-gray-700 hover:text-indigo-600"
                    >
                        Listings
                    </a>
                    <a
                        href="#"
                        className="block text-gray-700 hover:text-indigo-600"
                    >
                        Categories
                    </a>
                    <a
                        href="/login"
                        className="block text-gray-700 hover:text-indigo-600"
                    >
                        Login
                    </a>
                </div>
            )}
        </header>
    )
}
