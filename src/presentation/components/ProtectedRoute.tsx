'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth.store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mounted, setMounted] = useState(false);

  // Verificar autenticación solo en el cliente
  useEffect(() => {
    setMounted(true);
    
    // Verificar token en localStorage solo en el cliente
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && !isAuthenticated) {
        useAuthStore.setState({ isAuthenticated: true });
      } else if (!token && isAuthenticated) {
        useAuthStore.setState({ isAuthenticated: false });
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [mounted, isAuthenticated, router]);

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!mounted) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

