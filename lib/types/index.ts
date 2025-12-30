// Category types
export type CategoryType = 
  | 'news'
  | 'pistol'
  | 'rifle'
  | 'shotgun'
  | 'revolver'
  | 'ammunition'
  | 'reloading'
  | 'optics'
  | 'accessories'
  | 'history';

export interface Category {
  id: string;
  name: string;
  slug: CategoryType;
  description?: string;
}

// Article types
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: CategoryType;
  categoryName?: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImage?: string;
  images?: string[];
  videoUrl?: string;
  videoType?: 'youtube' | 'self-hosted';
  tags?: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  viewCount?: number;
}

// Search types
export interface SearchParams {
  query: string;
  tags?: string[];
  category?: CategoryType;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  articles: Article[];
  total: number;
  page: number;
  totalPages: number;
}

// Reloading data types
export interface ReloadingData {
  id: string;
  caliber: string;
  bulletWeight: string;
  powder: string;
  powderWeight: string;
  velocity: string;
  pressure: string;
  notes?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next?: string | null;
  previous?: string | null;
}

// Homepage sections
export interface HomepageData {
  featured: Article[];
  trending: Article[];
  latestByCategory: {
    [key in CategoryType]?: Article[];
  };
}
