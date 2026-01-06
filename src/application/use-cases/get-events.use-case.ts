import { IEventRepository } from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/entities/event.entity';

export class GetEventsUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(simple: boolean = true): Promise<Event[]> {
    return this.eventRepository.findAll(simple);
  }
}

