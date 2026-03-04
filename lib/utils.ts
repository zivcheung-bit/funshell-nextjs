import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '365d';

export function generateApiKey(): string {
  const randomBytes = crypto.randomBytes(32);
  return `fsk_${randomBytes.toString('hex')}`;
}

export function generateToken(payload: Record<string, unknown>): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as any);
}

export function verifyToken(token: string): Record<string, unknown> | null {
  try {
    return jwt.verify(token, JWT_SECRET) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `FS${timestamp}${random}`.toUpperCase();
}

export function generatePaymentAddress(currency: string): string {
  // 这里应该调用实际的区块链 API 生成地址
  // 临时返回模拟地址
  const random = crypto.randomBytes(20).toString('hex');
  
  switch (currency) {
    case 'BTC':
      return `bc1q${random.substring(0, 40)}`;
    case 'ETH':
    case 'USDT':
      return `0x${random}`;
    case 'TRX':
      return `T${random.substring(0, 33)}`;
    default:
      return random;
  }
}

export function generateQRCode(address: string, amount: number, currency: string): string {
  // 返回 QR code data URL
  // 实际应该使用 qrcode 库生成
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${currency}:${address}?amount=${amount}`;
}
