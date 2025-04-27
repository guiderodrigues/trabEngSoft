"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PizzaDetalhe({ params }: { params: { slug: string } }) {
    const pizzas = [
        {
            slug: "frango-com-catupiry",
            nome: "Frango com Catupiry",
            descricao:
                "Uma combinação irresistível de frango desfiado suculento e o autêntico Catupiry, sobre uma base de queijo muçarela derretido e molho de tomate especial. Finalizada com um toque de orégano, essa pizza é perfeita para quem ama um sabor cremoso e bem temperado!",
            imagem: "/frango.webp",
        },
        {
            slug: "portuguesa",
            nome: "Portuguesa",
            descricao:
                "Um clássico brasileiro: molho de tomate, queijo muçarela, presunto suculento, ovos cozidos, cebola, azeitonas pretas, pimentão e orégano, tudo sobre uma massa tradicional macia e crocante.",
            imagem: "/portuguesa.jpeg",
        },
        {
            slug: "carne-seca-catupiry",
            nome: "Carne seca com Catupiry",
            descricao:
                "Deliciosa carne seca desfiada com o toque irresistível do Catupiry, coberta com queijo muçarela, cebola roxa e orégano sobre massa artesanal.",
            imagem: "/pizza-carne-seca.jpg",
        },
        {
            slug: "costela",
            nome: "Costela",
            descricao:
                "Pizza especial de costela suculenta desfiada, sobre molho de tomate temperado, queijo muçarela derretido e pimentões coloridos.",
            imagem: "/costela.jpg",
        },
    ];

    const pizza = pizzas.find((p) => p.slug === params.slug);
    const [tamanho, setTamanho] = useState("media");
    const [quantidade, setQuantidade] = useState(1);

    if (!pizza) {
        return <div>Pizza não encontrada!</div>;
    }

    const precos = {
        pequena: 39.9,
        media: 54.9,
        grande: 69.9,
    };

    const precoFinal = (precos[tamanho as keyof typeof precos] * quantidade).toFixed(2);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center m-0 p-0">
            {/* Header */}
            <div className="bg-[#ed1f29] w-screen flex items-center justify-between p-4 text-white">
                {/* Botão de voltar */}
                <button className="text-white w-8 h-8">
                    <Link href="/homepage">
                    <ArrowLeftIcon />
                    </Link>
                </button>

                {/* Título */}
                <h1 className="text-3xl font-bold">Pizza</h1>

                {/* Espaço vazio para equilibrar */}
                <div className="w-8"></div>
            </div>


            {/* Conteúdo */}
            <h1 className="text-2xl text-gray-600 font-bold my-4">{pizza.nome}</h1>

            <Image
                src={pizza.imagem}
                alt={pizza.nome}
                width={450}
                height={450}
                className="rounded-lg mb-4"
            />

            <p className="text-gray-700 text-justify mb-6 max-w-md">{pizza.descricao}</p>

            {/* Escolha do tamanho */}
            <div className="mb-4">
                <h3 className="text-lg text-zinc-950 font-semibold mb-2">Escolha o tamanho:</h3>
                <div className="flex flex-col space-y-2">
                    <label className="text-black">
                        <input
                            type="radio"
                            name="tamanho"
                            value="pequena"
                            checked={tamanho === "pequena"}
                            onChange={(e) => setTamanho(e.target.value)}
                            className="mr-2"
                        />
                        Pequena (4 fatias) - R$39,90
                    </label>
                    <label className="text-black">
                        <input
                            type="radio"
                            name="tamanho"
                            value="media"
                            checked={tamanho === "media"}
                            onChange={(e) => setTamanho(e.target.value)}
                            className="mr-2"
                        />
                        Média (6 fatias) - R$54,90
                    </label>
                    <label className="text-black">
                        <input
                            type="radio"
                            name="tamanho"
                            value="grande"
                            checked={tamanho === "grande"}
                            onChange={(e) => setTamanho(e.target.value)}
                            className="mr-2"
                        />
                        Grande (8 fatias) - R$69,90
                    </label>
                </div>
            </div>

            {/* Quantidade */}
            <div className="mb-4">
                <h3 className="text-lg text-black font-semibold mb-2">Quantidade:</h3>
                <input
                    type="number"
                    min={1}
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                    className="border rounded text-black p-2 w-20 text-center"
                />
            </div>

            {/* Botão Finalizar */}
            <button className="w-full max-w-md bg-[#ed1f29] text-white font-bold py-3 rounded-full hover:bg-red-700 transition">
                Finalizar - R${precoFinal}
            </button>
        </div>
    );
}
