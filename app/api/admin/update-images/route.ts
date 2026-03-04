import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const products = [
      {
        name: 'Ledger Nano X',
        imageUrl: 'https://shop.ledger.com/cdn/shop/files/Nano-X-Black_1.png?v=1724245191&width=1024',
      },
      {
        name: 'Trezor Model T',
        imageUrl: 'https://trezor.io/content/wysiwyg/Images/Trezor_Model_T/Trezor_Model_T_front.png',
      },
      {
        name: 'Coldcard Mk4',
        imageUrl: 'https://coldcard.com/static/images/mk4/coldcard-mk4-front.png',
      },
      {
        name: 'Ledger Nano S Plus',
        imageUrl: 'https://shop.ledger.com/cdn/shop/files/Nano-S-Plus-Black_1.png?v=1724245191&width=1024',
      },
      {
        name: 'Trezor One',
        imageUrl: 'https://trezor.io/content/wysiwyg/Images/Trezor_One/Trezor_One_front.png',
      },
    ];

    const results = [];
    for (const product of products) {
      const result = await prisma.product.updateMany({
        where: { name: product.name },
        data: { imageUrl: product.imageUrl },
      });
      results.push({ name: product.name, updated: result.count });
    }

    return NextResponse.json({
      success: true,
      message: 'Product images updated successfully',
      data: results,
    });
  } catch (error) {
    console.error('Update images error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update images' },
      { status: 500 }
    );
  }
}
