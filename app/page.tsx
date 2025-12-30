import { Suspense } from 'react';
import FeaturedSection from '@/components/home/FeaturedSection';
import TrendingSection from '@/components/home/TrendingSection';
import LatestByCategory from '@/components/home/LatestByCategory';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { CategoryType } from '@/lib/types';
import { mockArticles, generateMockArticles } from '@/lib/utils/mockData';

export const revalidate = 300; // Revalidate every 5 minutes

function HomeContent() {
  const featured = mockArticles.filter(a => a.isFeatured).slice(0, 4);
  const trending = mockArticles.filter(a => a.isTrending).slice(0, 6);

  const categories: CategoryType[] = [
    'news',
    'pistol',
    'rifle',
    'shotgun',
    'revolver',
    'ammunition',
    'reloading',
    'optics',
    'accessories',
    'history',
  ];

  return (
    <>
      {/* Featured Section */}
      <FeaturedSection articles={featured} />

      {/* Trending Section */}
      <TrendingSection articles={trending} />

      {/* Latest by Category */}
      <section className="container-custom py-8 space-y-8">
        {categories.map((category) => {
          const articles = generateMockArticles(category, 3);
          return (
            <LatestByCategory
              key={category}
              category={category}
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
          <LoadingSkeleton variant="featured" />
          <div className="mt-8">
            <LoadingSkeleton count={6} />
          </div>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </div>
  );
}
