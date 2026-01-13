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

export async function apiGet<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 300 },
            // @ts-ignore - SSL certificate bypass for development
            agent: typeof window === 'undefined'
                ? new (require('https').Agent)({ rejectUnauthorized: false })
                : undefined,
        });

        if (!response.ok) {
            throw new ApiError(
                `HTTP error! status: ${response.status}`,
                response.status,
                url
            );
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}