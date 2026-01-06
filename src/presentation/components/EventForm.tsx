'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useEventStore } from '../stores/event.store';
import ErrorAlert from './ErrorAlert';
import LoadingSpinner from './LoadingSpinner';
import { Event } from '../../domain/entities/event.entity';

interface EventFormProps {
  eventId?: number;
}

export default function EventForm({ eventId }: EventFormProps) {
  const router = useRouter();
  const { currentEvent, isLoading, error, fetchEventById, createEvent, updateEvent, clearError } =
    useEventStore();

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
    place: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (eventId) {
      fetchEventById(eventId).catch(() => {
        // Error handled by store
      });
    }
  }, [eventId, fetchEventById]);

  useEffect(() => {
    if (currentEvent && eventId) {
      const date = new Date(currentEvent.date);
      const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setFormData({
        name: currentEvent.name || '',
        date: localDateTime,
        description: currentEvent.description || '',
        place: currentEvent.place || '',
      });
    }
  }, [currentEvent, eventId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationErrors({});

    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }

    if (!formData.date) {
      errors.date = 'La fecha es obligatoria';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> = {
        name: formData.name,
        date: new Date(formData.date).toISOString(),
        description: formData.description || undefined,
        place: formData.place || undefined,
      };

      if (eventId) {
        await updateEvent(eventId, eventData);
      } else {
        await createEvent(eventData);
      }
      router.push('/events');
    } catch (err) {
      // Error handled by store
    }
  };

  if (isLoading && eventId && !currentEvent) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <button
            onClick={() => router.push('/events')}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            ← Volver a la lista
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            {eventId ? 'Editar Evento' : 'Nuevo Evento'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <ErrorAlert message={error || ''} onClose={clearError} />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fecha y Hora <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                type="datetime-local"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {validationErrors.date && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.date}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Descripción
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="place" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Lugar
              </label>
              <input
                id="place"
                type="text"
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/events')}
                className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

