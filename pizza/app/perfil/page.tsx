"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, UserIcon, PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [updateError, setUpdateError] = useState("");

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
        setNewAddress(data.address);
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

  const handleAddressUpdate = async () => {
    if (!user) return;

    try {
      setUpdateError("");
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          address: newAddress,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar endereço');
      }

      setUser(data);
      setIsEditingAddress(false);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : 'Erro ao atualizar endereço');
    }
  };

  const startEditing = () => {
    setIsEditingAddress(true);
    setNewAddress(user?.address || '');
  };

  const cancelEditing = () => {
    setIsEditingAddress(false);
    setNewAddress(user?.address || '');
    setUpdateError("");
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
          <div className="w-full">
            <div className="flex items-center justify-between">
              <strong>Endereço:</strong>
              {!isEditingAddress ? (
                <button
                  onClick={startEditing}
                  className="text-[#ed1f29] hover:text-[#c41820]"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleAddressUpdate}
                    className="text-green-600 hover:text-green-700"
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            {isEditingAddress ? (
              <div className="mt-2">
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ed1f29]"
                  placeholder="Digite seu endereço"
                />
                {updateError && (
                  <p className="text-red-600 text-sm mt-1">{updateError}</p>
                )}
              </div>
            ) : (
              <div>{user.address}</div>
            )}
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
