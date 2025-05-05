import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import AuthCheck from './AuthCheck';
import OrdersList from './OrdersList';

const prisma = new PrismaClient();

type OrderWithRelations = {
  id: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
  items: {
    id: number;
    quantity: number;
    price: number;
    pizza: {
      name: string;
    };
  }[];
};

const getOrders = async (userId: number) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: userId
    },
    select: {
      id: true,
      totalPrice: true,
      status: true,
      createdAt: true,
      orderItems: {
        select: {
          id: true,
          quantity: true,
          price: true,
          pizza: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Transform the data to match our type
  return orders.map(order => ({
    ...order,
    items: order.orderItems
  })) as OrderWithRelations[];
};

export default async function MeusPedidos() {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-[#ed1f29] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/homepage" className="text-white">
              <ArrowLeftIcon className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold">Histórico de Pedidos</h1>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="p-4">
          <div className="max-w-4xl mx-auto">
            <OrdersList />
          </div>
        </main>
      </div>
    </AuthCheck>
  );
} 