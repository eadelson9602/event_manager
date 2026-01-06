'use client';

import { useParams } from 'next/navigation';
import ProtectedRoute from '../../../src/presentation/components/ProtectedRoute';
import EventDetailPage from '../../../src/presentation/pages/EventDetailPage';

export default function EventDetailPageWrapper() {
  const params = useParams();
  const eventId = Number(params.id);

  return (
    <ProtectedRoute>
      <EventDetailPage eventId={eventId} />
    </ProtectedRoute>
  );
}

