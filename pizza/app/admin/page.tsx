import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminCheck from './AdminCheck';
import OrderStatus from './OrderStatus';

const prisma = new PrismaClient();

type OrderWithRelations = {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
  user: {
    name: string;
    email: string;
    address: string;
  };
  items: {
    id: number;
    quantity: number;
    price: number;
    pizza: {
      name: string;
    };
  }[];
};

const getOrders = async () => {
  const orders = await prisma.order.findMany({
    select: {
      id: true,
      userId: true,
      totalPrice: true,
      status: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          email: true,
          address: true
        }
      },
      items: {
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
  }) as OrderWithRelations[];

  return orders;
};

export default async function AdminPage() {
  const orders = await getOrders();

  return (
    <AdminCheck>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-[#ed1f29] text-white p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Painel de Administração</h1>
          <Link 
            href="/homepage" 
            className="bg-white text-[#ed1f29] px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Voltar ao Menu
          </Link>
        </header>

        {/* Conteúdo */}
        <main className="p-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Gerenciamento de Pedidos</h2>
            
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600">Nenhum pedido encontrado.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold">Pedido #{order.id}</h3>
                        <p className="text-sm text-gray-600">
                          Cliente: {order.user.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Email: {order.user.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          Endereço: {order.user.address}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#ed1f29]">
                          Total: R$ {order.totalPrice.toFixed(2)}
                        </p>
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-sm">Status:</span>
                          <OrderStatus orderId={order.id} currentStatus={order.status} />
                        </div>
                        <p className="text-sm text-gray-600">
                          Data: {new Date(order.createdAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-bold mb-2">Itens do Pedido:</h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>
                              {item.quantity}x {item.pizza.name}
                            </span>
                            <span>
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </AdminCheck>
  );
} 