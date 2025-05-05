import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type RawOrder = {
  id: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: string; // JSON string of items
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'ID de usuário inválido' },
        { status: 400 }
      );
    }

    const orders = await prisma.$queryRaw<RawOrder[]>`
      SELECT 
        o.id,
        o.total_price as "totalPrice",
        o.status,
        o.created_at as "createdAt",
        json_group_array(
          json_object(
            'id', oi.id,
            'quantity', oi.quantity,
            'price', oi.price,
            'pizza', json_object(
              'name', p.name
            )
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN pizzas p ON oi.pizza_id = p.id
      WHERE o.user_id = ${userId}
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;

    // Transform the data to match the expected format
    const transformedOrders = orders.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }));

    return NextResponse.json(transformedOrders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar pedidos do usuário' },
      { status: 500 }
    );
  }
} 