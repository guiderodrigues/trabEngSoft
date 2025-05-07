'use client';

import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Pagamento Realizado com Sucesso!
        </h2>
        
        <p className="text-gray-600 mb-8">
          Seu pedido foi confirmado e está sendo preparado. Você receberá uma confirmação por email.
        </p>

        <button
          onClick={() => router.push('/homepage')}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
} 