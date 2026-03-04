import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Force Node.js runtime
export const runtime = 'nodejs';

// 管理员 API Key 生成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret } = body;

    // 简单的密钥验证（生产环境应该使用更安全的方式）
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'funshell-admin-2024';
    
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin secret' },
        { status: 403 }
      );
    }

    // 生成管理员 API Key
    const adminKey = 'fsk_admin_' + crypto.randomBytes(32).toString('hex');

    return NextResponse.json({
      success: true,
      data: {
        admin_key: adminKey,
        created_at: new Date().toISOString(),
        expires: 'Never',
        permissions: ['read_all_orders', 'update_orders', 'view_statistics'],
        note: 'Keep this key secure. It has full access to all orders and customer data.',
      },
      message: 'Admin API key generated successfully',
    });
  } catch (error) {
    console.error('Generate admin key error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to generate admin key' },
      { status: 500 }
    );
  }
}
