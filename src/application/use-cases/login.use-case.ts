import { IAuthRepository, LoginCredentials } from '../../domain/repositories/auth.repository.interface';
import { AuthResponse } from '../../domain/entities/user.entity';
import { httpClient } from '../../infrastructure/http/http-client';

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.authRepository.login(credentials);
    httpClient.setToken(response.token);
    return response;
  }
}

