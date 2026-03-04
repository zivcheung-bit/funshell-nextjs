import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// 用户确认支付
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const apiKeyId = request.headers.get('x-api-key-id');
    const body = await request.json();
    
    const { tx_hash } = body;

    if (!tx_hash) {
      return NextResponse.json(
        { success: false, error: 'Transaction hash is required' },
        { status: 400 }
      );
    }

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
        { success: false, error: 'Order is not pending payment' },
        { status: 400 }
      );
    }

    // 更新订单状态为已支付
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        txHash: tx_hash,
        status: 'paid',
        paidAt: new Date(),
      },
      include: {
        product: true,
        apiKey: true,
      },
    });

    // TODO: 这里可以发送通知给公司（邮件、Webhook、Telegram等）
    // 示例：await sendPaymentNotification(updatedOrder);

    return NextResponse.json({
      success: true,
      data: {
        order_id: updatedOrder.id,
        order_number: updatedOrder.orderNumber,
        status: updatedOrder.status,
        tx_hash: updatedOrder.txHash,
        paid_at: updatedOrder.paidAt,
      },
      message: 'Payment confirmed successfully. We will process your order soon.',
    });
  } catch (error) {
    console.error('Confirm payment error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}
