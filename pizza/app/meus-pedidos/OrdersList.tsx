"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

type OrderWithRelations = {
  id: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
  items: {
    id: number;
    quantity: number;
    price: number;
    pizza: {
      name: string;
    };
  }[];
};

export default function OrdersList() {
  const [orders, setOrders] = useState<OrderWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          throw new Error('Usuário não autenticado');
        }

        const user = JSON.parse(userData);
        const response = await fetch(`/api/orders/user/${user.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao carregar pedidos');
        }

        setOrders(data);
        console.log(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ed1f29] mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">Você ainda não fez nenhum pedido.</p>
        <Link 
          href="/homepage" 
          className="inline-block mt-4 bg-[#ed1f29] text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
        >
          Fazer um pedido
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-gray-700">Pedido #{order.id}</h3>
              <p className="text-sm text-gray-600">
                Data: {new Date(order.createdAt).toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#ed1f29]">
                Total: R$ {order.totalPrice.toFixed(2)}
              </p>
              <p className={`text-sm ${
                order.status === 'pending' ? 'text-yellow-600' :
                order.status === 'preparing' ? 'text-blue-600' :
                order.status === 'delivering' ? 'text-purple-600' :
                order.status === 'completed' ? 'text-green-600' :
                'text-red-600'
              }`}>
                Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-bold mb-2 text-gray-700">Itens do Pedido:</h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.pizza.name}
                  </span>
                  <span className='text-black'>
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 