import { apiConfig } from '../config/api.config';
import { ErrorHandler } from './error-handler';

export interface HttpError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export class HttpClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = apiConfig.baseUrl) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorData: unknown;
        try {
          errorData = await response.json();
        } catch {
          // Si no se puede parsear JSON, usar el statusText
          errorData = {
            message: response.statusText || 'An error occurred',
            statusCode: response.status,
          };
        }

        // Procesar el error usando el handler global
        const error = ErrorHandler.processError(errorData, 'An error occurred');
        error.status = response.status;
        throw error;
      }

      return await response.json();
    } catch (error) {
      // Si ya es un HttpError, relanzarlo
      if (ErrorHandler.isHttpError(error)) {
        throw error;
      }

      // Procesar errores de red u otros errores
      const processedError = ErrorHandler.processError(
        error,
        'Error de conexión. Por favor, verifica tu conexión a internet.'
      );

      // Si es un error de red (status 0), mantener el mensaje original si es más descriptivo
      if (error instanceof TypeError && error.message.includes('fetch')) {
        processedError.message = 'Error de conexión. Por favor, verifica que el servidor esté disponible.';
      }

      throw processedError;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const httpClient = new HttpClient();

