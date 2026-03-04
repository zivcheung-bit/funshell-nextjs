import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// 获取单个订单详情（管理员）
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        product: true,
        apiKey: {
          select: {
            id: true,
            name: true,
            email: true,
            agentType: true,
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
        customer: {
          api_key_id: order.apiKey.id,
          name: order.apiKey.name,
          email: order.apiKey.email,
          agent_type: order.apiKey.agentType,
        },
        product: order.product,
        quantity: order.quantity,
        total_price: order.totalPrice,
        currency: order.currency,
        payment: {
          currency: order.paymentCurrency,
          amount: order.paymentAmount,
          address: order.paymentAddress,
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
    console.error('Get admin order error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to get order' },
      { status: 500 }
    );
  }
}

// 更新订单状态（管理员）
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    const { status, tracking_number, notes } = body;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const updateData: any = {};

    // 更新状态
    if (status) {
      const validStatuses = ['pending_payment', 'paid', 'processing', 'shipped', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { success: false, error: 'Invalid status' },
          { status: 400 }
        );
      }

      updateData.status = status;

      // 自动设置时间戳
      if (status === 'shipped' && !order.shippedAt) {
        updateData.shippedAt = new Date();
      }
      if (status === 'completed' && !order.completedAt) {
        updateData.completedAt = new Date();
      }
      if (status === 'cancelled' && !order.cancelledAt) {
        updateData.cancelledAt = new Date();
      }
    }

    // 更新快递单号
    if (tracking_number !== undefined) {
      updateData.trackingNumber = tracking_number;
    }

    // 更新备注
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        product: true,
      },
    });

    // TODO: 发送状态更新通知给客户
    // 示例：await sendStatusUpdateNotification(updatedOrder);

    return NextResponse.json({
      success: true,
      data: {
        order_id: updatedOrder.id,
        order_number: updatedOrder.orderNumber,
        status: updatedOrder.status,
        tracking_number: updatedOrder.trackingNumber,
        notes: updatedOrder.notes,
        shipped_at: updatedOrder.shippedAt,
        completed_at: updatedOrder.completedAt,
        cancelled_at: updatedOrder.cancelledAt,
      },
      message: 'Order updated successfully',
    });
  } catch (error) {
    console.error('Update admin order error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update order' },
      { status: 500 }
    );
  }
}
