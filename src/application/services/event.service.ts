import { EventRepository } from '../../infrastructure/repositories/event.repository';
import { GetEventsUseCase } from '../use-cases/get-events.use-case';
import { GetEventByIdUseCase } from '../use-cases/get-event-by-id.use-case';
import { CreateEventUseCase } from '../use-cases/create-event.use-case';
import { UpdateEventUseCase } from '../use-cases/update-event.use-case';
import { DeleteEventUseCase } from '../use-cases/delete-event.use-case';
import { Event } from '../../domain/entities/event.entity';

class EventService {
  private eventRepository: EventRepository;
  private getEventsUseCase: GetEventsUseCase;
  private getEventByIdUseCase: GetEventByIdUseCase;
  private createEventUseCase: CreateEventUseCase;
  private updateEventUseCase: UpdateEventUseCase;
  private deleteEventUseCase: DeleteEventUseCase;

  constructor() {
    this.eventRepository = new EventRepository();
    this.getEventsUseCase = new GetEventsUseCase(this.eventRepository);
    this.getEventByIdUseCase = new GetEventByIdUseCase(this.eventRepository);
    this.createEventUseCase = new CreateEventUseCase(this.eventRepository);
    this.updateEventUseCase = new UpdateEventUseCase(this.eventRepository);
    this.deleteEventUseCase = new DeleteEventUseCase(this.eventRepository);
  }

  async getAllEvents(simple: boolean = true): Promise<Event[]> {
    return this.getEventsUseCase.execute(simple);
  }

  async getEventById(id: number): Promise<Event> {
    return this.getEventByIdUseCase.execute(id);
  }

  async createEvent(
    event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Event> {
    return this.createEventUseCase.execute(event);
  }

  async updateEvent(
    id: number,
    event: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Event> {
    return this.updateEventUseCase.execute(id, event);
  }

  async deleteEvent(id: number): Promise<void> {
    return this.deleteEventUseCase.execute(id);
  }
}

export const eventService = new EventService();

