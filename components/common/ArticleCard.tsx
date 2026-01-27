import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import {fixImageUrl, formatDate, generateExcerpt} from '@/lib/utils/helpers';

interface ArticleCardProps {
    article: Article;
    variant?: 'default' | 'featured' | 'small' | 'horizontal';
    priority?: boolean;
}

function getCategorySlugById(id: number): string {
    const map: Record<number, string> = {
        1: 'news', 2: 'ammunition', 3: 'pistol', 4: 'rifle',
        5: 'shotgun', 6: 'revolver', 7: 'accessories', 8: 'history',
        9: 'accessories', 10: 'optics', 11: 'reloading'
    };
    return map[id] || 'news';
}

function getCategoryNameById(id: number): string {
    const map: Record<number, string> = {
        1: 'News', 2: 'Ammunition', 3: 'Pistol', 4: 'Rifle',
        5: 'Shotgun', 6: 'Revolver', 7: 'Accessories', 8: 'History',
        9: 'Accessories', 10: 'Optics', 11: 'Reloading'
    };
    return map[id] || 'News';
}

export default function ArticleCard({
                                        article,
                                        variant = 'default',
                                        priority = false
                                    }: ArticleCardProps) {
    const imageUrl = article.image || '/images/placeholder.jpg';
    const excerpt = generateExcerpt(article.content, 150);
    const categorySlug = getCategorySlugById(article.category);
    const categoryName = getCategoryNameById(article.category);

    // Featured variant
    if (variant === 'featured') {
        return (
            <Link href={`/article/${article.slug}`} className="block group">
                <article className="relative overflow-hidden rounded-lg shadow-lg">
                    <div className="relative h-[400px] md:h-[500px]">
                        <Image
                            src={fixImageUrl(article.image)}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            priority={priority}
                            sizes="(max-width: 768px) 100vw, 1200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block bg-[#bb1919] text-white text-xs font-bold px-4 py-1.5 uppercase mb-4">
                {categoryName}
              </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white line-clamp-3 group-hover:text-gray-200 transition-colors">
                                {article.title}
                            </h2>
                            <p className="text-base text-gray-300 mb-3 line-clamp-2">
                                {excerpt}
                            </p>
                            <time className="text-sm text-gray-400">
                                {formatDate(article.published_at)}
                            </time>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    // Horizontal variant
    if (variant === 'horizontal') {
        return (
            <Link href={`/article/${article.slug}`} className="block group">
                <article className="flex gap-4 hover:bg-gray-50 p-2 rounded transition-colors">
                    <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded">
                        <Image
                            src={fixImageUrl(article.image)}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="128px"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
            <span className="inline-block text-[#bb1919] text-xs font-semibold uppercase mb-1">
              {categoryName}
            </span>
                        <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-[#bb1919] transition-colors">
                            {article.title}
                        </h3>
                        <time className="text-xs text-gray-600">
                            {formatDate(article.published_at)}
                        </time>
                    </div>
                </article>
            </Link>
        );
    }

    // Small variant
    if (variant === 'small') {
        return (
            <Link href={`/article/${article.slug}`} className="block group">
                <article className="p-4 hover:bg-gray-50 rounded-lg transition-colors">
          <span className="inline-block text-[#bb1919] text-xs font-semibold uppercase mb-2">
            {categoryName}
          </span>
                    <h3 className="font-bold text-base mb-2 line-clamp-3 group-hover:text-[#bb1919] transition-colors">
                        {article.title}
                    </h3>
                    <time className="text-xs text-gray-600">
                        {formatDate(article.published_at)}
                    </time>
                </article>
            </Link>
        );
    }

    // Default variant
    return (
        <Link href={`/article/${article.slug}`} className="block group">
            <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={fixImageUrl(article.image)}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="p-6">
          <span className="inline-block text-[#bb1919] text-xs font-semibold uppercase mb-3">
            {categoryName}
          </span>
                    <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-[#bb1919] transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {excerpt}
                    </p>
                    <time className="text-xs text-gray-500">
                        {formatDate(article.published_at)}
                    </time>
                </div>
            </article>
        </Link>
    );
}