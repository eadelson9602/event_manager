'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEventStore } from '../stores/event.store';
import { useAuthStore } from '../stores/auth.store';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

export default function EventsListPage() {
  const router = useRouter();
  const { events, isLoading, error, fetchEvents, clearError } = useEventStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    fetchEvents().catch(() => {
      // Error handled by store
    });
  }, [fetchEvents]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Eventos</h1>
          <div className="flex gap-4">
            <button
              onClick={logout}
              className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        <ErrorAlert message={error || ''} onClose={clearError} />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {events.length === 0 ? (
              <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
                <p className="text-gray-500 dark:text-gray-400">No hay eventos disponibles</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => router.push(`/events/${event.id}`)}
                    className="cursor-pointer rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg dark:bg-gray-800"
                  >
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                      {event.name}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(event.date)}
                    </p>
                    {event.place && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">📍 {event.place}</p>
                    )}
                    {event.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => router.push('/events/new')}
              className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-700"
              aria-label="Crear nuevo evento"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

