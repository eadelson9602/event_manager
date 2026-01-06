import { IEventRepository } from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/entities/event.entity';
import { httpClient } from '../http/http-client';

export class EventRepository implements IEventRepository {
  async findAll(simple: boolean = true): Promise<Event[]> {
    const response = await httpClient.get<Event[] | { data: Event[] }>(
      `/events?simple=${simple}`
    );
    return Array.isArray(response) ? response : response.data;
  }

  async findById(id: number): Promise<Event> {
    return httpClient.get<Event>(`/events/${id}`);
  }

  async create(
    event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Event> {
    return httpClient.post<Event>('/events', event);
  }

  async update(
    id: number,
    event: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Event> {
    return httpClient.put<Event>(`/events/${id}`, event);
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/events/${id}`);
  }
}

