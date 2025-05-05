import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const id = parseInt(params.slug);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid pizza ID' },
        { status: 400 }
      );
    }

    const pizza = await prisma.pizza.findUnique({
      where: {
        id: id
      }
    });

    if (!pizza) {
      return NextResponse.json(
        { error: 'Pizza not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(pizza);
  } catch (error) {
    console.error('Error fetching pizza:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 