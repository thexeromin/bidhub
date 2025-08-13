import Link from 'next/link'

interface Props {
    isOpen: boolean
    handleSidebarOpen: (flag: boolean) => void
}

export default function Sidebar({ isOpen, handleSidebarOpen }: Props) {
    const navItems = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Create Auction', href: '/auction/create' },
        { name: 'Live Auctions', href: '/auction' },
        { name: 'My Bids', href: '/bids' },
        { name: 'Won Items', href: '#' },
        { name: 'Settings', href: '#' },
    ]

    return (
        <div
            className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-50
  ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
            {/* Sidebar header with close button */}
            <div className="flex justify-between items-center p-4 border-b">
                <div className="font-bold text-xl">Auction Hub</div>

                {/* Close button - visible only on mobile */}
                <button
                    className="md:hidden p-2 rounded-md hover:bg-gray-200"
                    onClick={() => handleSidebarOpen(false)}
                    aria-label="Close sidebar"
                >
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
                </button>
            </div>

            {/* Sidebar nav */}
            <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    )
}
