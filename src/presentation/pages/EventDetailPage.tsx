'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEventStore } from '../stores/event.store';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

interface EventDetailPageProps {
  eventId: number;
}

export default function EventDetailPage({ eventId }: EventDetailPageProps) {
  const router = useRouter();
  const { currentEvent, isLoading, error, fetchEventById, deleteEvent, clearError } = useEventStore();

  useEffect(() => {
    if (eventId) {
      fetchEventById(eventId).catch(() => {
        // Error handled by store
      });
    }
  }, [eventId, fetchEventById]);

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        await deleteEvent(eventId);
        router.push('/events');
      } catch {
        // Error handled by store
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl">
          <ErrorAlert message="Evento no encontrado" />
          <button
            onClick={() => router.push('/events')}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <ErrorAlert message={error || ''} onClose={clearError} />

        <div className="mb-6">
          <button
            onClick={() => router.push('/events')}
            className="mb-4 text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            ← Volver a la lista
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {currentEvent.name}
          </h1>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha y Hora</h3>
              <p className="text-lg text-gray-900 dark:text-white">{formatDate(currentEvent.date)}</p>
            </div>

            {currentEvent.place && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Lugar</h3>
                <p className="text-lg text-gray-900 dark:text-white">{currentEvent.place}</p>
              </div>
            )}

            {currentEvent.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Descripción</h3>
                <p className="text-lg text-gray-900 dark:text-white">{currentEvent.description}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => router.push(`/events/${eventId}/edit`)}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

