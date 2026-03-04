import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Funshell Cold Wallet API is running',
    timestamp: new Date().toISOString(),
    platform: 'Next.js + PostgreSQL',
    version: '2.0.0'
  });
}
