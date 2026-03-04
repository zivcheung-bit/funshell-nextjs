import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/api/health',
    '/api/v1/api-keys',  // POST only for creating API keys
    '/api/v1/products',  // GET products is public
  ];
  
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

    // In production, you should store admin keys in database
    // For now, we just validate the format
    return NextResponse.next();
  }
  
  // Allow public routes
  if (publicRoutes.some(route => path.startsWith(route))) {
    // Only POST to /api/v1/api-keys is public
    if (path.startsWith('/api/v1/api-keys') && request.method !== 'POST') {
      // Continue to authentication check
    } else if (path.startsWith('/api/v1/products') && request.method === 'GET') {
      // GET products is public
      return NextResponse.next();
    } else if (path === '/api/health') {
      return NextResponse.next();
    } else if (path.startsWith('/api/v1/api-keys') && request.method === 'POST') {
      return NextResponse.next();
    }
  }

  // Check API key for protected routes
  if (path.startsWith('/api/v1/')) {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API key is required' },
        { status: 401 }
      );
    }

    try {
      const key = await prisma.apiKey.findUnique({
        where: { key: apiKey, isActive: true }
      });

      if (!key) {
        return NextResponse.json(
          { success: false, error: 'Invalid or inactive API key' },
          { status: 401 }
        );
      }

      // Add API key info to request headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-api-key-id', key.id);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 500 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
