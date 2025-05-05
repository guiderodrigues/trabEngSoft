"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar usuário');
      }

      // Store user data in localStorage (without password)
      localStorage.setItem('user', JSON.stringify(data));
      
      // Redirect to profile page
      router.push('/perfil');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ed1f29] flex items-center justify-center p-4">
      <div className="bg-[#ed1f29] rounded-lg w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <img
          src="/pizzalogo.jpg"
          alt="Logo Pizza"
          className="w-80 h-40mb-6"
        />

        {/* Formulário */}
        <form className="w-full px-8" onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="mb-4">
            <label className="block text-white font-bold text-sm mb-2" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Fulano da Silva"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-white font-bold text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@exemplo.com"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Endereço */}
          <div className="mb-4">
            <label className="block text-white font-bold text-sm mb-2" htmlFor="address">
              Endereço
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Rua Exemplo, 123 - Bairro"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Senha */}
          <div className="mb-6">
            <label className="block text-white font-bold text-sm mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="******"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
              required
              minLength={6}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="text-yellow-300 font-bold text-center mb-4">{error}</div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#ed1f29] font-bold py-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        {/* Link para login */}
        <p className="text-white text-sm mt-4 mb-2">
          Já tem uma conta?{" "}
          <a href="/login" className="underline font-semibold">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
