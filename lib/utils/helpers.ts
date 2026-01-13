import { CategoryType } from '../types';

export function formatDate(date: string): string {
  const d = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) return `${diffMinutes} mins ago`;
  if (diffHours < 24) return `${diffHours} hrs ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function generateExcerpt(content: string, length: number = 200): string {
    const clean = content.replace(/<[^>]*>/g, '');
    return clean.length > length ? clean.substring(0, length).trim() + '...' : clean;
}

export const CATEGORIES: { slug: CategoryType; name: string }[] = [
  { slug: 'news', name: 'News' },
  { slug: 'pistol', name: 'Pistol' },
  { slug: 'rifle', name: 'Rifle' },
  { slug: 'shotgun', name: 'Shotgun' },
  { slug: 'revolver', name: 'Revolver' },
  { slug: 'ammunition', name: 'Ammunition' },
  { slug: 'reloading', name: 'Reloading' },
  { slug: 'optics', name: 'Optics' },
  { slug: 'accessories', name: 'Accessories' },
  { slug: 'history', name: 'History' },
];

export function getCategoryName(slug: CategoryType): string {
  const category = CATEGORIES.find((c) => c.slug === slug);
  return category ? category.name : slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
