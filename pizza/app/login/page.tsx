"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioSalvo = localStorage.getItem("usuario");

    if (!usuarioSalvo) {
      setErro("Nenhum usuário cadastrado.");
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.email === email && usuario.senha === senha) {
      // Login válido
      setErro("");
      router.push("/homepage");
    } else {
      // Login inválido
      setErro("Email ou senha incorretos.");
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
        <form className="w-full px-8" onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-white font-bold text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@exemplo.com"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Senha */}
          <div className="mb-6">
            <label className="block text-white font-bold text-sm mb-2" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="******"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="text-yellow-300 font-bold text-center mb-4">{erro}</div>
          )}

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-white text-[#ed1f29] font-bold py-2 rounded-full hover:bg-gray-100 transition"
          >
            Entrar
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
