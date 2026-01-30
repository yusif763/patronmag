import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getArticlesByCategory } from '@/lib/api/services';
import { CATEGORIES, getCategoryName } from '@/lib/utils/helpers';
import { CategoryType } from '@/lib/types';
import CategoryArticlesList from "@/components/category/CategoryArticleList";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    const categoryName = getCategoryName(category as CategoryType);
    return {
        title: `${categoryName} | PatronMag`,
        description: `Latest articles about ${categoryName.toLowerCase()}`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;

    if (!CATEGORIES.find(c => c.slug === category)) {
        notFound();
    }

    const initialData = await getArticlesByCategory(category as CategoryType);
    const categoryName = getCategoryName(category as CategoryType);

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

            {/* Articles List with Infinite Scroll */}
            <CategoryArticlesList
                initialArticles={initialData}
                category={category as CategoryType}
                categoryName={categoryName}
            />
        </div>
    );
}