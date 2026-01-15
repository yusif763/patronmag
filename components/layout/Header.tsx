'use client';

import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/lib/utils/helpers';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className="bg-white border-b border-[#e4e4e4] sticky top-0 z-50 shadow-sm">
            {/* Top bar with logo and user actions */}
            <div className="border-b border-[#e4e4e4]">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/patron-logo.png"
                                alt="PMG Logo"
                                width={80}     // istədiyin ölçüyə görə dəyiş
                                height={40}
                                priority
                            />
                        </Link>

                        {/* Desktop search */}
                        <div className="hidden md:block flex-1 max-w-md mx-8">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles..."
                                    className="w-full px-4 py-2.5 pr-12 border border-[#e4e4e4] rounded-md focus:outline-none focus:border-[#bb1919] focus:ring-1 focus:ring-[#bb1919] transition-all"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                                    aria-label="Search"
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </div>

                        {/* Right side actions */}
                        <div className="flex items-center gap-4">
                            <button className="hidden md:block text-sm font-semibold hover:text-[#bb1919] transition-colors px-4 py-2">
                                Register
                            </button>
                            <button className="text-sm font-semibold hover:text-[#bb1919] transition-colors px-4 py-2">
                                Sign In
                            </button>
                        </div>
                    </div>

                    {/* Mobile search */}
                    <div className="md:hidden pb-4">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles..."
                                className="w-full px-4 py-2.5 pr-12 border border-[#e4e4e4] rounded-md focus:outline-none focus:border-[#bb1919] focus:ring-1 focus:ring-[#bb1919] transition-all"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                                aria-label="Search"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main navigation */}
            <nav className="hidden lg:block">
                <div className="container-custom">
                    <div className="flex items-center gap-8 h-14 overflow-x-auto">
                        <Link
                            href="/"
                            className="text-sm font-semibold hover:text-[#bb1919] transition-colors whitespace-nowrap py-2"
                        >
                            Home
                        </Link>
                        {CATEGORIES.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/${category.slug}`}
                                className="text-sm font-semibold hover:text-[#bb1919] transition-colors whitespace-nowrap py-2"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t border-[#e4e4e4] bg-white">
                    <nav className="container-custom py-6">
                        <div className="flex flex-col gap-1">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-semibold hover:text-[#bb1919] hover:bg-[#f2f2f2] transition-colors py-3 px-4 rounded-md"
                            >
                                Home
                            </Link>
                            {CATEGORIES.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/${category.slug}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-sm font-semibold hover:text-[#bb1919] hover:bg-[#f2f2f2] transition-colors py-3 px-4 rounded-md"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}