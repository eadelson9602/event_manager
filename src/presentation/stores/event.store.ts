import { create } from 'zustand';
import { eventService } from '../../application/services/event.service';
import { Event } from '../../domain/entities/event.entity';
import { HttpError } from '../../infrastructure/http/http-client';
import { ErrorHandler } from '../../infrastructure/http/error-handler';

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: number) => Promise<void>;
  createEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateEvent: (id: number, event: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  clearError: () => void;
  clearCurrentEvent: () => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,

  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const events = await eventService.getAllEvents(true);
      set({ events, isLoading: false });
    } catch (error) {
      const processedError = ErrorHandler.processError(error, 'Error al cargar eventos');
      set({
        error: processedError.message,
        isLoading: false,
      });
      throw processedError;
    }
  },

  fetchEventById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const event = await eventService.getEventById(id);
      set({ currentEvent: event, isLoading: false });
    } catch (error) {
      const processedError = ErrorHandler.processError(error, 'Error al cargar el evento');
      set({
        error: processedError.message,
        isLoading: false,
      });
      throw processedError;
    }
  },

  createEvent: async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    set({ isLoading: true, error: null });
    try {
      await eventService.createEvent(event);
      // Recargar la lista de eventos
      await get().fetchEvents();
      set({ isLoading: false });
    } catch (error) {
      const processedError = ErrorHandler.processError(error, 'Error al crear el evento');
      set({
        error: processedError.message,
        isLoading: false,
      });
      throw processedError;
    }
  },

  updateEvent: async (id: number, event: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>) => {
    set({ isLoading: true, error: null });
    try {
      await eventService.updateEvent(id, event);
      // Recargar la lista de eventos y el evento actual
      await Promise.all([get().fetchEvents(), get().fetchEventById(id)]);
      set({ isLoading: false });
    } catch (error) {
      const processedError = ErrorHandler.processError(error, 'Error al actualizar el evento');
      set({
        error: processedError.message,
        isLoading: false,
      });
      throw processedError;
    }
  },

  deleteEvent: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await eventService.deleteEvent(id);
      // Recargar la lista de eventos
      await get().fetchEvents();
      set({ isLoading: false, currentEvent: null });
    } catch (error) {
      const processedError = ErrorHandler.processError(error, 'Error al eliminar el evento');
      set({
        error: processedError.message,
        isLoading: false,
      });
      throw processedError;
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentEvent: () => set({ currentEvent: null }),
}));

