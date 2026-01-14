import { Suspense } from 'react';
import { getHomepageData } from '@/lib/api/services';
import FeaturedSection from '@/components/home/FeaturedSection';
import TrendingSection from '@/components/home/TrendingSection';
import LatestByCategory from '@/components/home/LatestByCategory';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { CATEGORIES } from '@/lib/utils/helpers';

export const revalidate = 300; // Revalidate every 5 minutes

async function HomeContent() {
    const data = await getHomepageData();

    return (
        <>
            {/* Featured Section */}
            {data.featured && data.featured.length > 0 && (
                <FeaturedSection articles={data.featured} />
            )}

            {/* Trending Section */}
            {data.trending && data.trending.length > 0 && (
                <TrendingSection articles={data.trending} />
            )}

            {/* Latest by Category */}
            <section className="container-custom py-8 space-y-12">
                {CATEGORIES.map((category) => {
                    const articles = data.latestByCategory?.[category.slug] || [];
                    if (articles.length === 0) return null;

                    return (
                        <LatestByCategory
                            key={category.slug}
                            category={category.slug}
                            articles={articles}
                        />
                    );
                })}
            </section>
        </>
    );
}

export default function HomePage() {
    return (
        <div className="bg-white">
            <Suspense fallback={
                <div className="container-custom py-8">
                    <LoadingSkeleton count={6} />
                </div>
            }>
                <HomeContent />
            </Suspense>
        </div>
    );
}