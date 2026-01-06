import { IEventRepository } from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/entities/event.entity';

export class GetEventByIdUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(id: number): Promise<Event> {
    return this.eventRepository.findById(id);
  }
}

