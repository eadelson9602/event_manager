import { IEventRepository } from '../../domain/repositories/event.repository.interface';

export class DeleteEventUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(id: number): Promise<void> {
    return this.eventRepository.delete(id);
  }
}

