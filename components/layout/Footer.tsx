import Link from 'next/link';
import { CATEGORIES } from '@/lib/utils/helpers';
export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-24">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div><h3 className="text-lg font-bold mb-6">PatronMag</h3><p className="text-gray-400 text-sm">Firearms news and information.</p></div>
          <div><h3 className="text-lg font-bold mb-6">Categories</h3><ul className="space-y-3">{CATEGORIES.slice(0,5).map(c=><li key={c.slug}><Link href={`/${c.slug}`} className="text-gray-400 text-sm hover:text-white">{c.name}</Link></li>)}</ul></div>
          <div><h3 className="text-lg font-bold mb-6">More</h3><ul className="space-y-3">{CATEGORIES.slice(5).map(c=><li key={c.slug}><Link href={`/${c.slug}`} className="text-gray-400 text-sm hover:text-white">{c.name}</Link></li>)}</ul></div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center"><p className="text-gray-400 text-sm">© 2025 PatronMag</p></div>
      </div>
    </footer>
  );
}
