import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getArticlesByCategory } from '@/lib/api/services';
import { CATEGORIES, getCategoryName } from '@/lib/utils/helpers';
import ArticleCard from '@/components/common/ArticleCard';
import EmptyState from '@/components/common/EmptyState';
import { CategoryType } from '@/lib/types';

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}



export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;

    // Validate category
    if (!CATEGORIES.find(c => c.slug === category)) {
        notFound();
    }

    const articles = await getArticlesByCategory(category as CategoryType);
    const categoryName = getCategoryName(category as CategoryType);
    console.log(articles,'/////')
    return (
        <div className="bg-white min-h-screen">
            {/* Category Header */}
            <div className="bg-dark text-white py-12">
                <div className="container-custom">
                    <h1 className="text-4xl font-bold">{categoryName}</h1>
                    <p className="text-gray-300 mt-2">
                        Latest articles and news about {categoryName.toLowerCase()}
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="container-custom py-12">
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="No articles found"
                        message={`There are no articles in the ${categoryName} category yet.`}
                    />
                )}
            </div>
        </div>
    );
}