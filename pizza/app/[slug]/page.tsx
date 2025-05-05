import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import PizzaForm from './PizzaForm';

const prisma = new PrismaClient();

interface Pizza {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

async function getPizza(id: string): Promise<Pizza | null> {
  const pizza = await prisma.pizza.findUnique({
    where: {
      id: parseInt(id)
    }
  });

  return pizza;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PizzaDetalhe({ params }: PageProps) {
    const resolvedParams = await params;
    const pizza = await getPizza(resolvedParams.slug);

    if (!pizza) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-red-600">Pizza não encontrada!</div>
            </div>
        );
    }

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
                <h1 className="text-3xl font-bold">Detalhes da Pizza</h1>

                {/* Espaço vazio para equilibrar */}
                <div className="w-8"></div>
            </div>

            {/* Conteúdo */}
            <h1 className="text-2xl text-gray-600 font-bold my-4">{pizza.name}</h1>

            <Image
                src={pizza.imageUrl}
                alt={pizza.name}
                width={450}
                height={450}
                className="rounded-lg mb-4"
            />

            <p className="text-gray-700 text-justify mb-6 max-w-md">{pizza.description}</p>

            <PizzaForm basePrice={pizza.price} pizzaId={pizza.id} />
        </div>
    );
}
