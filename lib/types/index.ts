export type CategoryType = 
  | 'news' | 'pistol' | 'rifle' | 'shotgun' | 'revolver'
  | 'ammunition' | 'reloading' | 'optics' | 'accessories' | 'history';

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: string;
  image?: string;
  category?: any;
  published_at: string;
  updated_at?: string;
  featured_image?: string;
  tags?: string[];
  is_featured?: boolean;
  is_trending?: boolean;
  view_count?: number;
}

export interface ReloadingData {
  id: number;
  caliber: string;
  bullet_weight: string;
  powder_type: string;
  powder_weight: string;
  velocity: string;
  pressure: string;
  notes?: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
