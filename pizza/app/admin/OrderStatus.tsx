"use client";

import { useState } from 'react';

interface OrderStatusProps {
  orderId: number;
  currentStatus: string;
}

export default function OrderStatus({ orderId, currentStatus }: OrderStatusProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar status');
      }

      setStatus(newStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status');
      setStatus(currentStatus); // Revert to previous status on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={loading}
        className={`text-sm rounded px-2 py-1 ${
          status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          status === 'preparing' ? 'bg-blue-100 text-blue-800' :
          status === 'delivering' ? 'bg-purple-100 text-purple-800' :
          status === 'completed' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        } cursor-pointer`}
      >
        <option value="pending">Pendente</option>
        <option value="preparing">Preparando</option>
        <option value="delivering">Em Entrega</option>
        <option value="completed">Entregue</option>
        <option value="cancelled">Cancelado</option>
      </select>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
} 