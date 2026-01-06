import { Event } from '../entities/event.entity';

export interface IEventRepository {
  findAll(simple?: boolean): Promise<Event[]>;
  findById(id: number): Promise<Event>;
  create(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event>;
  update(id: number, event: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Event>;
  delete(id: number): Promise<void>;
}

