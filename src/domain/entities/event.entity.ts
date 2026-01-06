export interface Event {
  id: number;
  name: string;
  date: string;
  description?: string;
  place?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

