import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pizzaId, quantity, size, totalPrice } = body;

    // Get user from localStorage (this will be handled on the client side)
    const userData = body.userData;
    if (!userData) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: userData.id,
        totalPrice: totalPrice,
        status: 'pending',
        items: {
          create: {
            pizzaId: pizzaId,
            quantity: quantity,
            price: totalPrice / quantity // Price per unit
          }
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Erro ao criar pedido' },
      { status: 500 }
    );
  }
} 