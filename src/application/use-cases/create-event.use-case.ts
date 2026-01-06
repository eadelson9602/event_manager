import { IEventRepository } from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/entities/event.entity';

export class CreateEventUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(
    event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Event> {
    return this.eventRepository.create(event);
  }
}

