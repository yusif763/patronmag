import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/common/ArticleCard';
import EmptyState from '@/components/common/EmptyState';
import { CategoryType } from '@/lib/types';
import { CATEGORIES, getCategoryName } from '@/lib/utils/helpers';
import { getArticlesByCategory } from '@/lib/utils/mockData';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = resolvedParams.category as CategoryType;
  const categoryName = getCategoryName(category);

  return {
    title: `${categoryName} - PatronMag`,
    description: `Latest articles and news about ${categoryName.toLowerCase()}. Expert reviews, guides, and information.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = resolvedParams.category as CategoryType;
  
  // Validate category
  if (!CATEGORIES.find(c => c.slug === category)) {
    notFound();
  }

  const articles = getArticlesByCategory(category);
  const categoryName = getCategoryName(category);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Header */}
      <div className="bg-[#1a1a1a] text-white py-8">
        <div className="container-custom">
          <h1 className="text-4xl font-bold">{categoryName}</h1>
          <p className="text-gray-300 mt-2">
            Latest articles and news about {categoryName.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container-custom py-8">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="articles"
            title="No articles found"
            message={`There are no articles in the ${categoryName} category yet.`}
          />
        )}
      </div>
    </div>
  );
}
