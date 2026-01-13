import { Suspense } from 'react';
import { getHomepageData } from '@/lib/api/services';
import ArticleCard from '@/components/common/ArticleCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import EmptyState from '@/components/common/EmptyState';

async function HomeContent() {
  const data = await getHomepageData();
  console.log(data);
  return (
    <div className="container-custom py-12">
      {data.featured?.length > 0 && (
        <section className="mb-16"><h2 className="text-3xl font-bold mb-8">Featured</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{data.featured.map(a=><ArticleCard key={a.id} article={a}/>)}</div></section>
      )}
      {data.trending?.length > 0 && (
        <section className="mb-16"><h2 className="text-3xl font-bold mb-8">Trending</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{data.trending.map(a=><ArticleCard key={a.id} article={a}/>)}</div></section>
      )}
      {!data.featured?.length && !data.trending?.length && <EmptyState />}
    </div>
  );
}

export default function HomePage() {
  return <Suspense fallback={<div className="container-custom py-12"><LoadingSkeleton /></div>}><HomeContent /></Suspense>;
}
