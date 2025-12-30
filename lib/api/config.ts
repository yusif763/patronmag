const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.patronmag.com';

export const API_ENDPOINTS = {
  // Articles
  ARTICLES: `${API_BASE_URL}/api/articles/`,
  ARTICLE_DETAIL: (slug: string) => `${API_BASE_URL}/api/articles/${slug}/`,
  
  // Categories
  CATEGORIES: `${API_BASE_URL}/api/categories/`,
  CATEGORY_ARTICLES: (category: string) => `${API_BASE_URL}/api/articles/?category=${category}`,
  
  // Homepage sections
  FEATURED: `${API_BASE_URL}/api/articles/?is_featured=true`,
  TRENDING: `${API_BASE_URL}/api/articles/?is_trending=true`,
  LATEST: `${API_BASE_URL}/api/articles/?ordering=-published_at`,
  LATEST_BY_CATEGORY: (category: string) => 
    `${API_BASE_URL}/api/articles/?category=${category}&ordering=-published_at`,
  
  // Search
  SEARCH: `${API_BASE_URL}/api/search/`,
  
  // Reloading data
  RELOADING_DATA: `${API_BASE_URL}/api/reloading/`,
} as const;

export const API_CONFIG = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default API_BASE_URL;
