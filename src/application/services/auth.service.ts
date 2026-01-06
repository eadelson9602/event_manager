import { AuthRepository } from '../../infrastructure/repositories/auth.repository';
import { LoginUseCase } from '../use-cases/login.use-case';
import { RegisterUseCase } from '../use-cases/register.use-case';
import { LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository.interface';
import { AuthResponse } from '../../domain/entities/user.entity';
import { httpClient } from '../../infrastructure/http/http-client';

class AuthService {
  private authRepository: AuthRepository;
  private loginUseCase: LoginUseCase;
  private registerUseCase: RegisterUseCase;

  constructor() {
    this.authRepository = new AuthRepository();
    this.loginUseCase = new LoginUseCase(this.authRepository);
    this.registerUseCase = new RegisterUseCase(this.authRepository);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.loginUseCase.execute(credentials);
  }

  async register(data: RegisterData): Promise<{ message: string }> {
    return this.registerUseCase.execute(data);
  }

  logout() {
    httpClient.setToken(null);
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService();

