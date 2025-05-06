"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      localStorage.setItem('user', JSON.stringify(data));
      router.push('/homepage');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
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
          className="w-80 h-40 mb-6"
        />

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-500 text-yellow-800 px-4 py-2 rounded mb-4 w-full text-center font-semibold">
            {error}
          </div>
        )}

        {/* Formulário */}
        <form className="w-full px-8" onSubmit={handleLogin}>
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
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#ed1f29] font-bold py-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Link para cadastro */}
        <p className="text-white text-sm mt-4 mb-2">
          Não tem uma conta?{" "}
          <a href="/cadastro" className="underline font-semibold">
            Cadastrar
          </a>
        </p>
      </div>
    </div>
  );
}
