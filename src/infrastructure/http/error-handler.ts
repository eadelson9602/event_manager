import { HttpError } from './http-client';

/**
 * Formato de respuesta de error del backend NestJS
 */
interface BackendErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

/**
 * Handler global para procesar errores HTTP y extraer mensajes del backend
 */
export class ErrorHandler {
  /**
   * Procesa un error HTTP y extrae el mensaje más relevante del backend
   */
  static extractErrorMessage(error: unknown): string {
    // Si es un HttpError ya procesado
    if (this.isHttpError(error)) {
      return error.message;
    }

    // Si es un Error estándar
    if (error instanceof Error) {
      return error.message;
    }

    // Si es un objeto con estructura de error del backend
    if (this.isBackendErrorResponse(error)) {
      return this.formatBackendError(error);
    }

    // Error desconocido
    return 'Ha ocurrido un error inesperado';
  }

  /**
   * Verifica si el error es un HttpError
   */
  static isHttpError(error: unknown): error is HttpError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      'status' in error
    );
  }

  /**
   * Verifica si el error tiene la estructura de respuesta del backend
   */
  private static isBackendErrorResponse(error: unknown): error is BackendErrorResponse {
    return (
      typeof error === 'object' &&
      error !== null &&
      ('message' in error || 'error' in error)
    );
  }

  /**
   * Formatea el error del backend en un mensaje legible
   */
  private static formatBackendError(error: BackendErrorResponse): string {
    // Si message es un array (errores de validación)
    if (Array.isArray(error.message)) {
      return error.message.join(', ');
    }

    // Si message es un string
    if (typeof error.message === 'string' && error.message.trim()) {
      return error.message;
    }

    // Si hay un campo error
    if (error.error && typeof error.error === 'string') {
      return error.error;
    }

    // Si hay errores de validación por campo
    if (error.errors && typeof error.errors === 'object') {
      const validationErrors = Object.values(error.errors)
        .flat()
        .filter((msg): msg is string => typeof msg === 'string');
      if (validationErrors.length > 0) {
        return validationErrors.join(', ');
      }
    }

    return 'Ha ocurrido un error';
  }

  /**
   * Procesa un error y retorna un HttpError normalizado
   */
  static processError(error: unknown, defaultMessage: string = 'Ha ocurrido un error'): HttpError {
    const message = this.extractErrorMessage(error);

    // Si ya es un HttpError, retornarlo
    if (this.isHttpError(error)) {
      return error;
    }

    // Si es una respuesta del backend, extraer el statusCode
    if (this.isBackendErrorResponse(error)) {
      return {
        message,
        status: error.statusCode || 500,
        errors: error.errors,
      };
    }

    // Error genérico
    return {
      message: message || defaultMessage,
      status: 0,
    };
  }
}

