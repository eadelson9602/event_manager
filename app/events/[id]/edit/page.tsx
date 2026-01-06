'use client';

import { useParams } from 'next/navigation';
import ProtectedRoute from '../../../../src/presentation/components/ProtectedRoute';
import EventForm from '../../../../src/presentation/components/EventForm';

export default function EditEventPage() {
  const params = useParams();
  const id = Number(params.id);

  return (
    <ProtectedRoute>
      <EventForm eventId={id} />
    </ProtectedRoute>
  );
}

