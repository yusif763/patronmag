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
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 300 },
    });

    if (!response.ok) {
        throw new ApiError(
            `HTTP error! status: ${response.status}`,
            response.status,
            url
        );
    }

    return response.json();
}
