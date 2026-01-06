'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../../src/presentation/components/ProtectedRoute';
import EventForm from '../../../src/presentation/components/EventForm';

export default function NewEventPage() {
  return (
    <ProtectedRoute>
      <EventForm />
    </ProtectedRoute>
  );
}

