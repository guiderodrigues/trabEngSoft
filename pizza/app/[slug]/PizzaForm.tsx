"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PizzaFormProps {
    basePrice: number;
    pizzaId: number;
}

export default function PizzaForm({ basePrice, pizzaId }: PizzaFormProps) {
    const router = useRouter();
    const [tamanho, setTamanho] = useState("media");
    const [quantidade, setQuantidade] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const precos = {
        pequena: basePrice * 0.7, // 30% menor que o preço médio
        media: basePrice,
        grande: basePrice * 1.3, // 30% maior que o preço médio
    };

    const precoFinal = (precos[tamanho as keyof typeof precos] * quantidade).toFixed(2);

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            // Get user data from localStorage
            const userData = localStorage.getItem('user');
            if (!userData) {
                router.push('/login');
                return;
            }

            const user = JSON.parse(userData);
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pizzaId,
                    quantity: quantidade,
                    size: tamanho,
                    totalPrice: Number(precoFinal),
                    userData: user
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao criar pedido');
            }

            // Redirect to payment page with order ID
            router.push(`/pagamento?orderId=${data.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar pedido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                        Pequena (4 fatias) - R${precos.pequena.toFixed(2)}
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
                        Média (6 fatias) - R${precos.media.toFixed(2)}
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
                        Grande (8 fatias) - R${precos.grande.toFixed(2)}
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

            {/* Error message */}
            {error && (
                <div className="text-red-600 font-bold text-center mb-4">{error}</div>
            )}

            {/* Botão Finalizar */}
            <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full max-w-md bg-[#ed1f29] text-white font-bold py-3 rounded-full hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
            >
                {loading ? 'Processando...' : `Finalizar - R$${precoFinal}`}
            </button>
        </>
    );
} 