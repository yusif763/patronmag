'use client';

import { useState, useEffect, useRef } from 'react';
import ArticleCard from '@/components/common/ArticleCard';
import EmptyState from '@/components/common/EmptyState';
import { Article, CategoryType } from '@/lib/types';
import { API_ENDPOINTS } from '@/lib/api/config';
import { apiGet } from '@/lib/api/client';
import type { ApiResponse } from '@/lib/types';

interface Props {
    initialArticles: Article[];
    category: CategoryType;
    categoryName: string;
}

// Loading Skeleton Component
function ArticleCardSkeleton() {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
            <div className="relative h-56 bg-gray-200" />
            <div className="p-6">
                <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
                <div className="h-5 bg-gray-200 rounded mb-3" />
                <div className="h-5 bg-gray-200 rounded w-4/5 mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
        </div>
    );
}

export default function CategoryArticlesList({
                                                 initialArticles,
                                                 category,
                                                 categoryName
                                             }: Props) {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // Load more articles
    const loadMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const nextPage = page + 1;
            const endpoint = `${API_ENDPOINTS.getCategoryEndpoint(category)}?page=${nextPage}`;
            const data = await apiGet<ApiResponse<Article>>(endpoint);

            if (data.results && data.results.length > 0) {
                // Filter out duplicates by ID
                setArticles(prev => {
                    const existingIds = new Set(prev.map(a => a.id));
                    const newArticles = data.results.filter(a => !existingIds.has(a.id));
                    return [...prev, ...newArticles];
                });

                setPage(nextPage);
                setHasMore(!!data.next);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading more articles:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [hasMore, loading, page]);

    if (articles.length === 0) {
        return (
            <div className="container-custom py-12">
                <EmptyState
                    title="No articles found"
                    message={`There are no articles in the ${categoryName} category yet.`}
                />
            </div>
        );
    }

    return (
        <div className="container-custom py-12">
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleCard key={`article-${article.id}`} article={article} />
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <ArticleCardSkeleton />
                    <ArticleCardSkeleton />
                    <ArticleCardSkeleton />
                </div>
            )}

            {/* Intersection Observer Target */}
            {hasMore && !loading && (
                <div
                    ref={loaderRef}
                    className="flex justify-center items-center py-12"
                >
                    <div className="flex flex-col items-center gap-3">
                        {/* Animated Circles */}
                        <div className="flex gap-2">
                            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-sm text-gray-500">Scroll to load more</span>
                    </div>
                </div>
            )}

            {/* End message */}
            {!hasMore && articles.length > 0 && (
                <div className="flex flex-col items-center gap-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-medium">You&#39;ve reached the end</p>
                    <p className="text-sm text-gray-400">No more articles to load</p>
                </div>
            )}
        </div>
    );
}