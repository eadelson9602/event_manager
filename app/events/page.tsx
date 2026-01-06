'use client';

import ProtectedRoute from '../../src/presentation/components/ProtectedRoute';
import EventsListPage from '../../src/presentation/pages/EventsListPage';

export default function EventsPage() {
  return (
    <ProtectedRoute>
      <EventsListPage />
    </ProtectedRoute>
  );
}

