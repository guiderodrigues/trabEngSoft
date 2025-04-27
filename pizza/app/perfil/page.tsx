"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Perfil() {
  const [usuario, setUsuario] = useState<{ nome: string; email: string; endereco: string; senha: string } | null>(null);

  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }, []);

  if (!usuario) {
    return <div className="min-h-screen flex items-center justify-center">Carregando perfil...</div>;
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
        <h1 className="text-3xl font-bold">Perfil</h1>

        {/* Espaço para balancear o layout */}
        <div className="w-8"></div>
      </div>

      {/* Conteúdo do Perfil */}
      <div className="p-8 w-full flex flex-col items-center">
        <div className="bg-white text-black rounded-lg shadow p-6 w-full max-w-md space-y-4 flex flex-col items-center">
          {/* Ícone de usuário DENTRO do card */}
          <UserIcon className="w-16 h-16 text-[#ed1f29]" />

          <div>
            <strong>Nome:</strong> {usuario.nome}
          </div>
          <div>
            <strong>Email:</strong> {usuario.email}
          </div>
          <div>
            <strong>Endereço:</strong> {usuario.endereco}
          </div>
        </div>
      </div>
    </div>
  );
}
