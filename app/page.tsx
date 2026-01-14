'use client';

import { useState, useEffect } from 'react';
import { getHomepageData } from '@/lib/api/services';
import ArticleCard from '@/components/common/ArticleCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import EmptyState from '@/components/common/EmptyState';
import { CATEGORIES } from '@/lib/utils/helpers';
import Link from 'next/link';
import { Article } from '@/lib/types';

export default function HomePage() {
    const [data, setData] = useState<{
        featured: Article[];
        trending: Article[];
        latestByCategory: Record<string, Article[]>;
    }>({
        featured: [],
        trending: [],
        latestByCategory: {},
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('🔄 Starting to fetch homepage data...');

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                console.log('📡 Calling getHomepageData()...');
                const result = await getHomepageData();

                console.log('✅ Homepage data received:', result);
                console.log('📊 Featured:', result.featured?.length);
                console.log('📊 Trending:', result.trending?.length);
                console.log('📊 Categories:', Object.keys(result.latestByCategory || {}).length);

                setData(result);
            } catch (err) {
                console.error('❌ Error fetching homepage data:', err);
                setError(err instanceof Error ? err.message : 'Failed to load data');
            } finally {
                setLoading(false);
                console.log('✅ Fetch complete');
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="bg-white">
                <div className="container-custom py-12">
                    <LoadingSkeleton count={6} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white">
                <div className="container-custom py-12">
                    <EmptyState
                        title="Error"
                        message={`Failed to load: ${error}`}
                    />
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="container-custom py-12">
                {/* Featured */}
                {data.featured && data.featured.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-8">Featured ({data.featured.length})</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {data.featured.map(a => (
                                <ArticleCard key={a.id} article={a} variant="featured" priority />
                            ))}
                        </div>
                    </section>
                )}

                {/* Trending */}
                {data.trending && data.trending.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-8">Trending ({data.trending.length})</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.trending.map(a => (
                                <ArticleCard key={a.id} article={a} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Latest by Category */}
                {data.latestByCategory && Object.keys(data.latestByCategory).length > 0 && (
                    <div className="space-y-16">
                        {CATEGORIES.map(category => {
                            const articles = data.latestByCategory[category.slug];
                            if (!articles || articles.length === 0) {
                                console.log(`⚠️ No articles for category: ${category.slug}`);
                                return null;
                            }

                            console.log(`✅ Category ${category.slug}: ${articles.length} articles`);

                            return (
                                <section key={category.slug}>
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-3xl font-bold capitalize">
                                            {category.name} ({articles.length})
                                        </h2>
                                        <Link
                                            href={`/${category.slug}`}
                                            className="text-primary hover:underline font-semibold"
                                        >
                                            View All →
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {articles.map(a => (
                                            <ArticleCard key={a.id} article={a} />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}

                {/* Empty State */}
                {(!data.featured || data.featured.length === 0) &&
                    (!data.trending || data.trending.length === 0) &&
                    (!data.latestByCategory || Object.keys(data.latestByCategory).length === 0) && (
                        <EmptyState title="No articles" message="No articles available." />
                    )}

                {/* Debug Info */}
                <div className="mt-8 p-4 bg-gray-100 rounded text-xs">
                    <p><strong>Debug Info:</strong></p>
                    <p>Featured: {data.featured?.length || 0}</p>
                    <p>Trending: {data.trending?.length || 0}</p>
                    <p>Categories: {Object.keys(data.latestByCategory || {}).join(', ')}</p>
                </div>
            </div>
        </div>
    );
}