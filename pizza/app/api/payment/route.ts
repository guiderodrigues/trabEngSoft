import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cardNumber, cardHolder, expiryDate, cvv, orderId } = body;

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        cardNumber,
        cardHolder,
        expiryDate,
        cvv,
        paymentStatus: 'completed',
        orderId: parseInt(orderId)
      }
    });

    // Update order status
    await prisma.order.update({
      where: {
        id: parseInt(orderId)
      },
      data: {
        status: 'paid'
      }
    });

    return NextResponse.json({ success: true, payment });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
} 