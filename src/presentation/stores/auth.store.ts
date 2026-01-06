import { create } from 'zustand';
import { authService } from '../../application/services/auth.service';
import { LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository.interface';
import { HttpError } from '../../infrastructure/http/http-client';
import { ErrorHandler } from '../../infrastructure/http/error-handler';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false, // Inicializar como false para evitar problemas de hidratación
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      await authService.login(credentials);
      set({ isAuthenticated: true, isLoading: false });
    } catch (error) {
      const processedError = ErrorHandler.processError(error, 'Error al iniciar sesión');
      set({
        error: processedError.message,
        isLoading: false,
        isAuthenticated: false,
      });
      throw processedError;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });
    try {
      await authService.register(data);
      set({ isLoading: false });
    } catch (error) {
      const processedError = ErrorHandler.processError(error, 'Error al registrar usuario');
      set({
        error: processedError.message,
        isLoading: false,
      });
      throw processedError;
    }
  },

  logout: () => {
    authService.logout();
    set({ isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
}));

