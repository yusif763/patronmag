import { API_CONFIG } from './config';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = API_CONFIG.timeout, retries = 3, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          ...API_CONFIG.headers,
          ...fetchOptions.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          url
        );
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, url);
      }

      // Don't retry on 4xx errors
      if (error instanceof ApiError && error.statusCode && error.statusCode < 500) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw lastError || new ApiError('Request failed after retries', 500, url);
}

export async function apiGet<T>(url: string, options?: FetchOptions): Promise<T> {
  try {
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'GET',
    });

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API GET Error:', error);
    throw error;
  }
}

export async function apiPost<T>(
  url: string,
  body: unknown,
  options?: FetchOptions
): Promise<T> {
  try {
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API POST Error:', error);
    throw error;
  }
}
