import { IAuthRepository, LoginCredentials, RegisterData } from '../../domain/repositories/auth.repository.interface';
import { AuthResponse } from '../../domain/entities/user.entity';
import { httpClient } from '../http/http-client';

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return httpClient.post<AuthResponse>('/auth/login', credentials);
  }

  async register(data: RegisterData): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>('/api/register', data);
  }
}

