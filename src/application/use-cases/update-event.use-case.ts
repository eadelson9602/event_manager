import { IEventRepository } from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/entities/event.entity';

export class UpdateEventUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(
    id: number,
    event: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Event> {
    return this.eventRepository.update(id, event);
  }
}

