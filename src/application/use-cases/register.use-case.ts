import { IAuthRepository, RegisterData } from '../../domain/repositories/auth.repository.interface';

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(data: RegisterData): Promise<{ message: string }> {
    return this.authRepository.register(data);
  }
}

