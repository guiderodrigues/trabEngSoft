"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, address, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer cadastro");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer cadastro");
    }
  };

  return (
    <div className="min-h-screen bg-[#ed1f29] flex items-center justify-center p-4">
      <div className="bg-[#ed1f29] rounded-lg w-full max-w-sm flex flex-col items-center">
        
        {/* Logo */}
        <img
          src="/pizzalogo.jpg"
          alt="Logo Pizza"
          className="w-80 h-40 mb-6"
        />

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-500 text-yellow-800 px-4 py-2 rounded mb-4 w-full text-center font-semibold">
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full px-8">
          {/* Nome */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-bold text-sm mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Fulano da Silva"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@exemplo.com"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Endereço */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-white font-bold text-sm mb-2">
              Endereço
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Rua Exemplo, 123 - Bairro"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Senha */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-white font-bold text-sm mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-white text-[#ed1f29] font-bold py-2 rounded-full hover:bg-gray-100 transition"
          >
            Cadastrar
          </button>
        </form>

        {/* Link para login */}
        <p className="text-white text-sm mt-4 mb-2">
          Já tem uma conta?{" "}
          <Link href="/login" className="underline font-semibold">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
