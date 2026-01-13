'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/utils/helpers';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="border-b">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg></button>
            <Link href="/" className="flex gap-1">
              <div className="bg-primary text-white font-bold text-xl px-4 py-2">P</div>
              <div className="bg-primary text-white font-bold text-xl px-4 py-2">M</div>
              <div className="bg-primary text-white font-bold text-xl px-4 py-2">G</div>
            </Link>
            <button className="text-sm font-semibold">Sign In</button>
          </div>
        </div>
      </div>
      <nav className="hidden lg:block">
        <div className="container-custom"><div className="flex gap-8 h-14">
          <Link href="/" className="text-sm font-semibold hover:text-primary py-2">Home</Link>
          {CATEGORIES.map(c => <Link key={c.slug} href={`/${c.slug}`} className="text-sm font-semibold hover:text-primary py-2">{c.name}</Link>)}
        </div></div>
      </nav>
    </header>
  );
}
