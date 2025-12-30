import Link from 'next/link';
import { Article, CategoryType } from '@/lib/types';
import ArticleCard from '../common/ArticleCard';
import { getCategoryName } from '@/lib/utils/helpers';

interface LatestByCategoryProps {
  category: CategoryType;
  articles: Article[];
}

export default function LatestByCategory({ 
  category, 
  articles 
}: LatestByCategoryProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="border-b border-[#e4e4e4] pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{getCategoryName(category)}</h2>
        <Link
          href={`/${category}`}
          className="text-sm font-semibold text-[#bb1919] hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article, index) => (
          <ArticleCard 
            key={article.id} 
            article={article}
            variant={index === 0 ? 'default' : 'small'}
          />
        ))}
      </div>
    </div>
  );
}
