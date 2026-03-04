import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Force Node.js runtime for Prisma compatibility
export const runtime = 'nodejs';

// 获取所有订单（管理员）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const search = searchParams.get('search'); // 搜索订单号或客户信息
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {};
    
    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { orderNumber: { contains: search } },
        { shippingName: { contains: search } },
        { shippingPhone: { contains: search } },
        { txHash: { contains: search } },
      ];
    }

    const [orders, total, stats] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
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
          apiKey: {
            select: {
              id: true,
              name: true,
              email: true,
              agentType: true,
            },
          },
        },
      }),
      prisma.order.count({ where }),
      // 统计各状态订单数量
      prisma.order.groupBy({
        by: ['status'],
        _count: true,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: orders.map(order => ({
        order_id: order.id,
        order_number: order.orderNumber,
        customer: {
          api_key_name: order.apiKey.name,
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
        paid_at: order.paidAt,
        shipped_at: order.shippedAt,
        completed_at: order.completedAt,
        expires_at: order.expiresAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      statistics: {
        by_status: stats.reduce((acc, item) => {
          acc[item.status] = item._count;
          return acc;
        }, {} as Record<string, number>),
        total_orders: total,
      },
    });
  } catch (error) {
    console.error('Get admin orders error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to get orders' },
      { status: 500 }
    );
  }
}
