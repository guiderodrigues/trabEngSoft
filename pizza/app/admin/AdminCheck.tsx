"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = () => {
      try {
        const userData = localStorage.getItem('user');
        
        if (!userData) {
          router.push('/login');
          return;
        }

        const user = JSON.parse(userData);
        if (!user.isAdmin) {
          router.push('/login');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/login');
      }
    };

    checkAdmin();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ed1f29] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 