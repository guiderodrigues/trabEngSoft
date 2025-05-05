"use client";

import { useEffect, useState } from "react";
import { UserIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Pizza {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('/api/pizzas');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao carregar pizzas');
        }

        setPizzas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar pizzas');
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-[#ed1f29] font-bold">Carregando cardápio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-[#ed1f29] font-bold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#ed1f29] text-white flex items-center justify-between p-4">
        <button className="text-2xl">☰</button>
        <h1 className="text-3xl font-bold">Pizza Express</h1>
        <div className="flex items-center gap-4">
          <Link href="/meus-pedidos" className="text-white">
            <ClipboardDocumentListIcon className="w-6 h-6" />
          </Link>
          <Link href="/perfil" className="text-white">
            <UserIcon className="w-6 h-6" />
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="p-4 flex justify-center">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl text-zinc-950 font-bold mb-4">Cardápio</h2>

          {/* Lista de pizzas */}
          <div className="space-y-4">
            {pizzas.map((pizza) => (
              <Link 
                key={pizza.id} 
                href={`/${pizza.id}`} 
                className='flex'
              >
                <div className="bg-white text-gray-600 font-semibold rounded-lg shadow p-4 flex w-full">
                  <img
                    src={pizza.imageUrl}
                    alt={pizza.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold">{pizza.name}</h3>
                      <span className="text-[#ed1f29] font-bold">
                        R$ {pizza.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {pizza.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
