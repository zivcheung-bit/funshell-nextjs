import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber, generatePaymentAddress, generateQRCode } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const apiKeyId = request.headers.get('x-api-key-id');
    const body = await request.json();
    
    const {
      product_id,
      quantity,
      payment_currency,
      shipping,
    } = body;

    // Validation
    if (!product_id || !quantity || !payment_currency || !shipping) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get product
    const product = await prisma.product.findUnique({
      where: { id: product_id, isActive: true },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check stock
    if (product.stock < quantity) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Generate payment address
    const paymentAddress = generatePaymentAddress(payment_currency);
    
    // Mock exchange rate (should use real API)
    const exchangeRates: { [key: string]: number } = {
      BTC: 0.000015,
      ETH: 0.00025,
      USDT: 0.13,
      TRX: 8.5,
    };
    
    const paymentAmount = totalPrice * (exchangeRates[payment_currency] || 1);
    const qrCode = generateQRCode(paymentAddress, paymentAmount, payment_currency);

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        apiKeyId: apiKeyId!,
        productId: product_id,
        quantity,
        totalPrice,
        currency: product.currency,
        paymentCurrency: payment_currency,
        paymentAmount,
        paymentAddress,
        paymentQrCode: qrCode,
        shippingName: shipping.name,
        shippingPhone: shipping.phone,
        shippingAddress: shipping.address,
        shippingCity: shipping.city,
        shippingCountry: shipping.country,
        shippingPostalCode: shipping.postal_code,
        status: 'pending_payment',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        order_id: order.id,
        order_number: order.orderNumber,
        product: {
          id: order.product.id,
          name: order.product.name,
          brand: order.product.brand,
        },
        quantity: order.quantity,
        total_price: order.totalPrice,
        currency: order.currency,
        payment: {
          currency: order.paymentCurrency,
          amount: order.paymentAmount,
          address: order.paymentAddress,
          qr_code: order.paymentQrCode,
        },
        status: order.status,
        expires_at: order.expiresAt,
        created_at: order.createdAt,
      },
      message: 'Order created successfully. Please complete payment within 15 minutes.',
    }, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const apiKeyId = request.headers.get('x-api-key-id');
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const skip = (page - 1) * limit;

    const where: { apiKeyId: string; status?: string } = { apiKeyId: apiKeyId! };
    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
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
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: orders.map(order => ({
        order_id: order.id,
        order_number: order.orderNumber,
        product: order.product,
        quantity: order.quantity,
        total_price: order.totalPrice,
        currency: order.currency,
        payment_currency: order.paymentCurrency,
        status: order.status,
        created_at: order.createdAt,
        updated_at: order.updatedAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to get orders' },
      { status: 500 }
    );
  }
}
