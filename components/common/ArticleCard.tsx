import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { formatDate, getCategoryName } from '@/lib/utils/helpers';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'small' | 'horizontal';
  priority?: boolean;
}

export default function ArticleCard({ 
  article, 
  variant = 'default',
  priority = false 
}: ArticleCardProps) {
  const imageUrl = article.featuredImage || '/images/placeholder.jpg';

  if (variant === 'featured') {
    return (
      <Link href={`/article/${article.slug}`} className="block group">
        <article className="relative">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="mb-3">
                <span className="inline-block bg-[#bb1919] text-white text-xs font-bold px-3 py-1 uppercase">
                  {getCategoryName(article.category)}
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-3 line-clamp-3 group-hover:text-gray-200 transition-colors">
                {article.title}
              </h2>
              <p className="text-sm md:text-base text-gray-300 mb-2 line-clamp-2">
                {article.excerpt}
              </p>
              <time className="text-xs md:text-sm text-gray-400">
                {formatDate(article.publishedAt)}
              </time>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/article/${article.slug}`} className="block group">
        <article className="flex gap-4">
          <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="128px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <span className="inline-block text-[#bb1919] text-xs font-semibold uppercase">
                {getCategoryName(article.category)}
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-[#bb1919] transition-colors">
              {article.title}
            </h3>
            <time className="text-xs text-gray-600">
              {formatDate(article.publishedAt)}
            </time>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'small') {
    return (
      <Link href={`/article/${article.slug}`} className="block group">
        <article>
          <div className="mb-2">
            <span className="inline-block text-[#bb1919] text-xs font-semibold uppercase">
              {getCategoryName(article.category)}
            </span>
          </div>
          <h3 className="font-bold text-sm mb-1 line-clamp-3 group-hover:text-[#bb1919] transition-colors">
            {article.title}
          </h3>
          <time className="text-xs text-gray-600">
            {formatDate(article.publishedAt)}
          </time>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className="block group">
      <article>
        <div className="relative h-48 mb-3 overflow-hidden">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mb-2">
          <span className="inline-block text-[#bb1919] text-xs font-semibold uppercase">
            {getCategoryName(article.category)}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#bb1919] transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {article.excerpt}
        </p>
        <time className="text-xs text-gray-500">
          {formatDate(article.publishedAt)}
        </time>
      </article>
    </Link>
  );
}
