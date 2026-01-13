'use client';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-9xl font-bold text-primary">404</h1><h2 className="text-3xl font-bold mb-4">Page Not Found</h2><Link href="/" className="bg-primary text-white px-6 py-3 rounded font-semibold">Go Home</Link></div></div>
  );
}
