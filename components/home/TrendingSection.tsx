import { Article } from '@/lib/types';
import ArticleCard from '../common/ArticleCard';

interface TrendingSectionProps {
  articles: Article[];
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="bg-[#f2f2f2] py-8">
      <div className="container-custom">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#bb1919] text-white font-bold px-4 py-2 uppercase text-sm">
            Trending
          </div>
          <div className="h-px flex-1 bg-[#e4e4e4]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 6).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
