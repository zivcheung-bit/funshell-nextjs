import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Middleware 不支持 Node.js runtime，所以我们需要移除 Prisma 调用
// 认证逻辑将在各个路由内部处理

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Admin routes require admin API key
  if (path.startsWith('/api/admin')) {
    // Allow auth endpoint to generate admin keys
    if (path === '/api/admin/auth') {
      return NextResponse.next();
    }
    
    const adminKey = request.headers.get('x-admin-key');
    
    if (!adminKey) {
      return NextResponse.json(
        { success: false, error: 'Admin API key is required' },
        { status: 401 }
      );
    }

    // Validate admin key format
    if (!adminKey.startsWith('fsk_admin_')) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin API key format' },
        { status: 401 }
      );
    }

    // Format validation passed, let route handle database validation
    return NextResponse.next();
  }
  
  // Public routes
  const publicRoutes = [
    '/api/health',
    '/api/v1/products',
  ];
  
  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }
  
  // API key creation is public
  if (path === '/api/v1/api-keys' && request.method === 'POST') {
    return NextResponse.next();
  }

  // For other /api/v1/ routes, just check if API key header exists
  // Actual validation will be done in the route handler
  if (path.startsWith('/api/v1/')) {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API key is required' },
        { status: 401 }
      );
    }

    // Pass through to route handler for database validation
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
