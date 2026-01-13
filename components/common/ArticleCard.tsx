import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils/helpers';
export default function ArticleCard({ article }: { article: Article }) {

    console.log('article', article);
  return (
    <Link href={`/article/${article.slug}`} className="block group">
      <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden">
        <div className="relative h-56"><Image src={article.image||'/images/placeholder.jpg'} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" /></div>
        <div className="p-6"><h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary">{article.title}</h3><p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p><time className="text-xs text-gray-500">{formatDate(article.published_at)}</time></div>
      </article>
    </Link>
  );
}
