import { apiGet } from './client';
import { API_ENDPOINTS } from './config';
import { Article, CategoryType, ApiResponse, ReloadingData } from '../types';

export async function getArticlesByCategory(category: CategoryType): Promise<Article[]> {
    const endpoint = API_ENDPOINTS.getCategoryEndpoint(category);
    const data = await apiGet<ApiResponse<Article>>(endpoint);
    return data.results || [];
}

export async function getArticleBySlug(category: CategoryType, slug: string): Promise<Article | undefined> {
    const articles = await getArticlesByCategory(category);
    return articles.find((a) => a.slug === slug);
}

export async function searchArticles(query: string): Promise<Article[]> {
    const url = `${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`;
    const data = await apiGet<ApiResponse<Article>>(url);
    return data.results || [];
}

export async function getReloadingData(): Promise<ReloadingData[]> {
    const data = await apiGet<ApiResponse<ReloadingData>>(API_ENDPOINTS.RELOADING_DATA);
    return data.results || [];
}

export async function getHomepageData() {
    const categories: CategoryType[] = [
        'news', 'pistol', 'rifle', 'shotgun', 'revolver',
        'ammunition', 'reloading', 'optics', 'accessories', 'history',
    ];

    try {
        const allArticles = await Promise.all(
            categories.map(async (cat) => {
                try {
                    return await getArticlesByCategory(cat);
                } catch {
                    return [];
                }
            })
        );

        const flatArticles = allArticles.flat();

        // Featured - əvvəlcə is_featured olanlar, yoxdursa ən yeni 4-ü
        let featured = flatArticles.filter((a) => a.is_featured);
        if (featured.length === 0) {
            featured = flatArticles
                .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
                .slice(0, 4);
        } else {
            featured = featured.slice(0, 4);
        }

        // Trending - əvvəlcə is_trending olanlar, yoxdursa ən yeni 6-sı
        let trending = flatArticles.filter((a) => a.is_trending);
        if (trending.length === 0) {
            trending = flatArticles
                .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
                .slice(0, 6);
        } else {
            trending = trending.slice(0, 6);
        }

        const latestByCategory: Record<string, Article[]> = {};
        categories.forEach((cat, i) => {
            latestByCategory[cat] = allArticles[i]?.slice(0, 3) || [];
        });

        return { featured, trending, latestByCategory };
    } catch (error) {
        console.error('Homepage data error:', error);
        return {
            featured: [],
            trending: [],
            latestByCategory: {},
        };
    }
}