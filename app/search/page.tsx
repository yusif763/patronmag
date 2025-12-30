'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ArticleCard from '@/components/common/ArticleCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import EmptyState from '@/components/common/EmptyState';
import { Article } from '@/lib/types';
import { mockArticles } from '@/lib/utils/mockData';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchArticles = () => {
      setIsLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        if (!query.trim()) {
          setResults([]);
          setIsLoading(false);
          return;
        }

        // Simple search in mock data
        const filtered = mockArticles.filter((article) => {
          const searchLower = query.toLowerCase();
          return (
            article.title.toLowerCase().includes(searchLower) ||
            article.excerpt.toLowerCase().includes(searchLower) ||
            article.tags?.some(tag => tag.toLowerCase().includes(searchLower))
          );
        });

        setResults(filtered);
        setIsLoading(false);
      }, 500);
    };

    searchArticles();
  }, [query]);

  return (
    <div className="bg-white min-h-screen">
      {/* Search Header */}
      <div className="bg-[#f2f2f2] py-8 border-b border-[#e4e4e4]">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          {query && (
            <p className="text-gray-600">
              {isLoading ? (
                'Searching...'
              ) : (
                <>
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for{' '}
                  <strong>&quot;{query}&quot;</strong>
                </>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-custom py-8">
        {isLoading ? (
          <LoadingSkeleton count={6} />
        ) : !query ? (
          <EmptyState
            icon="search"
            title="Enter a search query"
            message="Use the search bar above to find articles, tags, and more."
          />
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="search"
            title="No results found"
            message={`We couldn't find any articles matching "${query}". Try different keywords or browse our categories.`}
          />
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="bg-white min-h-screen">
        <div className="bg-[#f2f2f2] py-8 border-b border-[#e4e4e4]">
          <div className="container-custom">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          </div>
        </div>
        <div className="container-custom py-8">
          <LoadingSkeleton count={6} />
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
