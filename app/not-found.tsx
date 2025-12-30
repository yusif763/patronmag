'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#bb1919]">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#bb1919] text-white px-6 py-3 rounded font-semibold hover:bg-[#a01616] transition-colors"
          >
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="border border-[#bb1919] text-[#bb1919] px-6 py-3 rounded font-semibold hover:bg-[#bb1919] hover:text-white transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Popular Categories */}
        <div className="mt-12">
          <p className="text-sm text-gray-600 mb-4">Or browse our categories:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['News', 'Pistol', 'Rifle', 'Shotgun', 'Revolver'].map((cat) => (
              <Link
                key={cat}
                href={`/${cat.toLowerCase()}`}
                className="text-sm bg-[#f2f2f2] hover:bg-[#e4e4e4] px-4 py-2 rounded transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
