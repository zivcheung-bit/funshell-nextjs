import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateApiKey } from '@/lib/utils';

// Force Node.js runtime for Prisma compatibility
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, agentType, description } = body;

    console.log('Creating API key for:', { name, email, agentType });

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Generate API key
    const key = generateApiKey();
    console.log('Generated API key:', key.substring(0, 10) + '...');

    // Create API key in database
    const apiKey = await prisma.apiKey.create({
      data: {
        key,
        name,
        email,
        agentType,
        description,
      },
    });

    console.log('API key created in database:', apiKey.id);

    return NextResponse.json({
      success: true,
      data: {
        id: apiKey.id,
        key: apiKey.key,
        name: apiKey.name,
        email: apiKey.email,
        agentType: apiKey.agentType,
        createdAt: apiKey.createdAt,
      },
      message: 'API key created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Create API key error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create API key' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const apiKeyId = request.headers.get('x-api-key-id');
    
    if (!apiKeyId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const apiKey = await prisma.apiKey.findUnique({
      where: { id: apiKeyId },
      select: {
        id: true,
        name: true,
        email: true,
        agentType: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API key not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: apiKey,
    });
  } catch (error) {
    console.error('Get API key error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to get API key' },
      { status: 500 }
    );
  }
}
