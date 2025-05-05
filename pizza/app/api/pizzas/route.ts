import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pizzas = await prisma.pizza.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(pizzas);
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar pizzas' },
      { status: 500 }
    );
  }
} 