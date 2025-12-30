import { CategoryType } from '../types';

// Format date
export function formatDate(date: string): string {
  const d = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return `${diffMinutes} mins ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hrs ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return d.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}

// Category helpers
export const CATEGORIES: { slug: CategoryType; name: string; icon?: string }[] = [
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
  if (!slug) return '';
  const category = CATEGORIES.find((c) => c.slug === slug);
  return category ? category.name : slug.charAt(0).toUpperCase() + slug.slice(1);
}

// URL helpers
export function getArticleUrl(slug: string): string {
  return `/article/${slug}`;
}

export function getCategoryUrl(category: CategoryType): string {
  return `/${category}`;
}

export function getSearchUrl(query: string): string {
  return `/search?q=${encodeURIComponent(query)}`;
}

// YouTube video ID extractor
export function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Class name merger
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
