'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/utils/helpers';
import SearchBar from './SearchBar';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[#e4e4e4] sticky top-0 z-50">
      {/* Top bar with logo and user actions */}
      <div className="border-b border-[#e4e4e4]">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded"
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
              <div className="flex items-center gap-1">
                <div className="bg-[#bb1919] text-white font-bold text-xl px-3 py-1">
                  P
                </div>
                <div className="bg-[#bb1919] text-white font-bold text-xl px-3 py-1">
                  M
                </div>
                <div className="bg-[#bb1919] text-white font-bold text-xl px-3 py-1">
                  G
                </div>
              </div>
            </Link>

            {/* Desktop search */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block text-sm font-semibold hover:text-[#bb1919] transition-colors">
                Register
              </button>
              <button className="text-sm font-semibold hover:text-[#bb1919] transition-colors">
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-4">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="hidden lg:block border-b border-[#e4e4e4]">
        <div className="container-custom">
          <div className="flex items-center gap-6 h-12 overflow-x-auto">
            <Link
              href="/"
              className="text-sm font-semibold hover:text-[#bb1919] transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="text-sm font-semibold hover:text-[#bb1919] transition-colors whitespace-nowrap"
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
          <nav className="container-custom py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold hover:text-[#bb1919] transition-colors py-2"
              >
                Home
              </Link>
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold hover:text-[#bb1919] transition-colors py-2"
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
