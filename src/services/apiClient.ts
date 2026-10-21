import { ApiError, CsrfResponse } from '@/types/auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

class ApiClient {
  private csrfToken: string | null = null;
  private csrfHeaderName: string = 'X-XSRF-TOKEN';
  private csrfPromise: Promise<string | null> | null = null;

  public async getCsrfToken(forceRefresh = false): Promise<string | null> {
    if (this.csrfToken && !forceRefresh) {
      return this.csrfToken;
    }

    if (this.csrfPromise && !forceRefresh) {
      return this.csrfPromise;
    }

    this.csrfPromise = (async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/csrf`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data: CsrfResponse = await response.json();
          this.csrfToken = data.token;
          if (data.headerName) {
            this.csrfHeaderName = data.headerName;
          }
          return this.csrfToken;
        }
      } catch (err) {
        console.warn('Failed to initialize CSRF token:', err);
      } finally {
        this.csrfPromise = null;
      }
      return null;
    })();

    return this.csrfPromise;
  }

  public async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const method = (options.method || 'GET').toUpperCase();
    const isMutating = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (options.body && typeof options.body === 'string') {
      headers['Content-Type'] = 'application/json';
    }

    // Attach CSRF header on mutating requests
    if (isMutating) {
      const token = await this.getCsrfToken();
      if (token) {
        headers[this.csrfHeaderName] = token;
      }
    }

    let response: Response;
    try {
      response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });
    } catch (networkError) {
      throw {
        status: 0,
        message: 'Unable to connect to the server. Please check your internet connection.',
      } as ApiError;
    }

    // If CSRF token expired/invalid (403), retry once with fresh CSRF token
    if (response.status === 403 && isMutating) {
      const freshToken = await this.getCsrfToken(true);
      if (freshToken) {
        headers[this.csrfHeaderName] = freshToken;
        try {
          response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
          });
        } catch {
          // Fall through to error handling
        }
      }
    }

    if (!response.ok) {
      let errorData: Partial<ApiError> = {};
      try {
        errorData = await response.json();
      } catch {
        // If response is not JSON
      }

      const apiError: ApiError = {
        status: response.status,
        error: errorData.error || response.statusText,
        message: errorData.message || 'An unexpected error occurred. Please try again.',
        fieldErrors: errorData.fieldErrors,
        path: errorData.path,
      };

      throw apiError;
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    try {
      return (await response.json()) as T;
    } catch {
      return {} as T;
    }
  }

  public get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public post<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const apiClient = new ApiClient();
