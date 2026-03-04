import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const apiKeyId = request.headers.get('x-api-key-id');
    
    const order = await prisma.order.findFirst({
      where: {
        id,
        apiKeyId: apiKeyId!,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            brand: true,
            model: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        order_id: order.id,
        order_number: order.orderNumber,
        product: order.product,
        quantity: order.quantity,
        total_price: order.totalPrice,
        currency: order.currency,
        payment: {
          currency: order.paymentCurrency,
          amount: order.paymentAmount,
          address: order.paymentAddress,
          qr_code: order.paymentQrCode,
          tx_hash: order.txHash,
        },
        shipping: {
          name: order.shippingName,
          phone: order.shippingPhone,
          address: order.shippingAddress,
          city: order.shippingCity,
          country: order.shippingCountry,
          postal_code: order.shippingPostalCode,
          tracking_number: order.trackingNumber,
        },
        status: order.status,
        notes: order.notes,
        created_at: order.createdAt,
        updated_at: order.updatedAt,
        paid_at: order.paidAt,
        shipped_at: order.shippedAt,
        completed_at: order.completedAt,
        cancelled_at: order.cancelledAt,
        expires_at: order.expiresAt,
      },
    });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to get order' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const apiKeyId = request.headers.get('x-api-key-id');
    
    const order = await prisma.order.findFirst({
      where: {
        id,
        apiKeyId: apiKeyId!,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.status !== 'pending_payment') {
      return NextResponse.json(
        { success: false, error: 'Only pending orders can be cancelled' },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: 'cancelled',
        cancelledAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        order_id: updatedOrder.id,
        order_number: updatedOrder.orderNumber,
        status: updatedOrder.status,
        cancelled_at: updatedOrder.cancelledAt,
      },
      message: 'Order cancelled successfully',
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to cancel order' },
      { status: 500 }
    );
  }
}
