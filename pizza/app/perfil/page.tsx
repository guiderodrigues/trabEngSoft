"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  isAdmin: boolean;
}

export default function Perfil() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (!userData) {
          router.push('/login');
          return;
        }

        const { id } = JSON.parse(userData);

        // Fetch fresh user data from API
        const response = await fetch(`/api/user?id=${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao carregar dados do usuário');
        }

        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-[#ed1f29] font-bold">Carregando perfil...</div>
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-0 m-0">
      {/* Header */}
      <div className="bg-[#ed1f29] w-screen flex items-center justify-between p-4 text-white">
        {/* Botão de voltar para Home */}
        <Link href="/homepage" className="w-8 h-8 flex items-center">
          <ArrowLeftIcon className="w-8 h-8" />
        </Link>

        {/* Título */}
        <h1 className="text-3xl font-bold">Meu Perfil</h1>

        {/* Botão de logout */}
        <button
          onClick={handleLogout}
          className="text-sm underline"
        >
          Sair
        </button>
      </div>

      {/* Conteúdo do Perfil */}
      <div className="p-8 w-full flex flex-col items-center">
        <div className="bg-white text-black rounded-lg shadow p-6 w-full max-w-md space-y-4 flex flex-col items-center">
          {/* Ícone de usuário DENTRO do card */}
          <UserIcon className="w-16 h-16 text-[#ed1f29]" />

          <div>
            <strong>Nome:</strong> {user.name}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Endereço:</strong> {user.address}
          </div>
          {user.isAdmin && (
            <div className="mt-2 text-[#ed1f29] font-bold">
              Administrador
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
