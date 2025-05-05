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

      // Store user data in localStorage (without password)
      localStorage.setItem('user', JSON.stringify(data));
      
      // Redirect to homepage
      router.push('/homepage');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#ed1f29] mb-6">Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Logo */}
        <img
          src="/pizzalogo.jpg"
          alt="Logo Pizza"
          className="w-80 h-40mb-6"
        />

        {/* Formulário */}
        <form className="w-full px-8" onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@exemplo.com"
              className="w-full p-2 bg-gray-200 text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Senha */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold text-sm mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="******"
              className="w-full p-2 bg-gray-200 text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ed1f29] text-white font-bold py-2 rounded-full hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Link para cadastro */}
        <p className="text-gray-700 text-sm mt-4 mb-2">
          Não tem uma conta?{" "}
          <a href="/cadastro" className="underline font-semibold">
            Cadastrar
          </a>
        </p>
      </div>
    </div>
  );
}
