'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!orderId) {
      router.push('/homepage');
    }
  }, [orderId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    // Basic validation
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv) {
      setError('Por favor, preencha todos os campos');
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          orderId: parseInt(orderId || '0'),
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      router.push('/pagamento/sucesso');
    } catch (err) {
      setError('Erro ao processar pagamento. Tente novamente.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Voltar
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pagamento</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-black">
              Número do Cartão
            </label>
            <input
              type="text"
              id="cardNumber"
              maxLength={16}
              placeholder="1234567890123456"
              className="mt-1 block w-full text-gray-600 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="cardHolder" className="block text-sm font-medium text-black">
              Nome no Cartão
            </label>
            <input
              type="text"
              id="cardHolder"
              placeholder="NOME COMO ESTÁ NO CARTÃO"
              className="mt-1 text-gray-600 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.cardHolder}
              onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-black">
                Data de Expiração
              </label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/AA"
                maxLength={5}
                className="mt-1 text-gray-600 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-black">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                maxLength={3}
                placeholder="123"
                className="mt-1 text-gray-600 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processando...' : 'Finalizar Pagamento'}
          </button>
        </form>
      </div>
    </div>
  );
} 