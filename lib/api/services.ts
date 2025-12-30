import { apiGet } from './client';
import { API_ENDPOINTS } from './config';
import {
  Article,
  CategoryType,
  PaginatedResponse,
  SearchResult,
  SearchParams,
  HomepageData,
  ReloadingData,
} from '../types';

// Articles
export async function getArticles(
  limit?: number
): Promise<PaginatedResponse<Article>> {
  const url = limit 
    ? `${API_ENDPOINTS.ARTICLES}?limit=${limit}`
    : API_ENDPOINTS.ARTICLES;
  return apiGet<PaginatedResponse<Article>>(url);
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  return apiGet<Article>(API_ENDPOINTS.ARTICLE_DETAIL(slug));
}

export async function getArticlesByCategory(
  category: CategoryType,
  limit?: number
): Promise<PaginatedResponse<Article>> {
  const url = limit
    ? `${API_ENDPOINTS.CATEGORY_ARTICLES(category)}&limit=${limit}`
    : API_ENDPOINTS.CATEGORY_ARTICLES(category);
  return apiGet<PaginatedResponse<Article>>(url);
}

// Homepage sections
export async function getFeaturedArticles(
  limit: number = 4
): Promise<Article[]> {
  const response = await apiGet<PaginatedResponse<Article>>(
    `${API_ENDPOINTS.FEATURED}&limit=${limit}`
  );
  return response.results || [];
}

export async function getTrendingArticles(
  limit: number = 6
): Promise<Article[]> {
  const response = await apiGet<PaginatedResponse<Article>>(
    `${API_ENDPOINTS.TRENDING}&limit=${limit}`
  );
  return response.results || [];
}

export async function getLatestArticles(
  limit: number = 10
): Promise<Article[]> {
  const response = await apiGet<PaginatedResponse<Article>>(
    `${API_ENDPOINTS.LATEST}&limit=${limit}`
  );
  return response.results || [];
}

export async function getLatestByCategory(
  category: CategoryType,
  limit: number = 3
): Promise<Article[]> {
  const response = await apiGet<PaginatedResponse<Article>>(
    `${API_ENDPOINTS.LATEST_BY_CATEGORY(category)}&limit=${limit}`
  );
  return response.results || [];
}

export async function getHomepageData(): Promise<HomepageData> {
  try {
    const [featured, trending] = await Promise.all([
      getFeaturedArticles(4),
      getTrendingArticles(6),
    ]);

    // Get latest articles for each category
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

    const latestByCategory: HomepageData['latestByCategory'] = {};

    await Promise.all(
      categories.map(async (category) => {
        try {
          const articles = await getLatestByCategory(category, 3);
          latestByCategory[category] = articles;
        } catch (error) {
          console.error(`Failed to fetch latest for ${category}:`, error);
          latestByCategory[category] = [];
        }
      })
    );

    return {
      featured,
      trending,
      latestByCategory,
    };
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    throw error;
  }
}

// Search
export async function searchArticles(
  params: SearchParams
): Promise<SearchResult> {
  const searchParams = new URLSearchParams();
  searchParams.append('q', params.query);
  
  if (params.tags && params.tags.length > 0) {
    params.tags.forEach(tag => searchParams.append('tags', tag));
  }
  
  if (params.category) {
    searchParams.append('category', params.category);
  }
  
  if (params.page) {
    searchParams.append('page', params.page.toString());
  }
  
  if (params.limit) {
    searchParams.append('limit', params.limit.toString());
  }

  const url = `${API_ENDPOINTS.SEARCH}?${searchParams.toString()}`;
  return apiGet<SearchResult>(url);
}

// Reloading data
export async function getReloadingData(): Promise<ReloadingData[]> {
  const response = await apiGet<PaginatedResponse<ReloadingData>>(
    API_ENDPOINTS.RELOADING_DATA
  );
  return response.results || [];
}
