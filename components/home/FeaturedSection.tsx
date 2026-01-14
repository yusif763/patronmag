import { Article } from '@/lib/types';
import ArticleCard from '../common/ArticleCard';

interface FeaturedSectionProps {
    articles: Article[];
}

export default function FeaturedSection({ articles }: FeaturedSectionProps) {
    if (!articles || articles.length === 0) return null;

    const [mainArticle, ...sideArticles] = articles;

    return (
        <section className="container-custom py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main featured article - takes 2 columns */}
                <div className="lg:col-span-2">
                    <ArticleCard article={mainArticle} variant="featured" priority />
                </div>

                {/* Side articles */}
                <div className="space-y-6">
                    {sideArticles.slice(0, 3).map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            variant="horizontal"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}