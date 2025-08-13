'use client'
import React, { useState } from 'react'
import Sidebar from '../layout/sidebar'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

interface Props {
    title?: string
    children: React.ReactNode
}

export default function Main({ children, title }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} handleSidebarOpen={setSidebarOpen} />

            {/* Main content */}
            <div className="flex-1 flex flex-col md:ml-64">
                {/* Header */}
                <header className="flex items-center justify-between bg-white px-4 py-3 shadow">
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-200"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle sidebar"
                    >
                        {/* Hamburger icon */}
                        {sidebarOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>

                    <div className="text-lg font-semibold">{title}</div>

                    {/* <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border border-gray-300"
                    /> */}

                    <Button variant="brand" size="sm" onClick={() => signOut()}>
                        Signout
                    </Button>
                </header>

                {/* Dashboard content */}
                <main className="p-6 space-y-6">{children}</main>
            </div>
        </div>
    )
}
