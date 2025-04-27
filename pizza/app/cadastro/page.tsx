"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Salvar os dados no LocalStorage
    const usuario = { nome, email, endereco, senha };
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Redirecionar para perfil
    router.push("/perfil");
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
            <label className="block text-white font-bold text-sm mb-2" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Fulano da Silva"
              className="w-full p-2 bg-white text-gray-950 rounded-full text-center placeholder-gray-400 focus:outline-none"
            />
          </div>

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

          {/* Endereço */}
          <div className="mb-4">
            <label className="block text-white font-bold text-sm mb-2" htmlFor="endereco">
              Endereço
            </label>
            <input
              id="endereco"
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Rua Exemplo, 123 - Bairro"
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
          <a href="/login" className="underline font-semibold">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
