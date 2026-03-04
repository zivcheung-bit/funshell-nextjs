// 统一收款地址
export const PAYMENT_ADDRESSES = {
  BTC: '14GPSthwFECk42TYc5q3nFcxTiJTjg1vPw',
  ETH: '0x80cf3f974daea135aa28cdc8a3574cbd94521c5b',
  BNB: '0x80cf3f974daea135aa28cdc8a3574cbd94521c5b',
  SOL: 'FmwYStF61XEfbENrktmoqimonQ1gfV6jaKST9Feb4gBw',
  DOGE: 'DKh4wYNHWUNxsgeBzsNWmWwJVNaABLicEB',
  TRX: 'TKvRkkTm5AWLvfZX4iac6f5e7fq8Nwjrr7',
};

// 汇率配置 (HKD 对各币种的汇率，需要定期更新)
// 这里使用近似汇率，实际应该对接实时汇率 API
export const EXCHANGE_RATES: Record<string, number> = {
  BTC: 0.0000015,   // 1 HKD ≈ 0.0000015 BTC (假设 BTC = 666,666 HKD)
  ETH: 0.000035,    // 1 HKD ≈ 0.000035 ETH (假设 ETH = 28,571 HKD)
  BNB: 0.0002,      // 1 HKD ≈ 0.0002 BNB (假设 BNB = 5,000 HKD)
  SOL: 0.0008,      // 1 HKD ≈ 0.0008 SOL (假设 SOL = 1,250 HKD)
  DOGE: 0.35,       // 1 HKD ≈ 0.35 DOGE (假设 DOGE = 2.86 HKD)
  TRX: 0.6,         // 1 HKD ≈ 0.6 TRX (假设 TRX = 1.67 HKD)
  USDT: 0.128,      // 1 HKD ≈ 0.128 USDT (1 USD ≈ 7.8 HKD)
};

/**
 * 将 HKD 金额转换为指定加密货币金额
 */
export function convertHKDToCrypto(hkdAmount: number, currency: string): number {
  const rate = EXCHANGE_RATES[currency.toUpperCase()];
  if (!rate) {
    throw new Error(`Unsupported currency: ${currency}`);
  }
  
  const cryptoAmount = hkdAmount * rate;
  
  // 根据币种设置精度
  const decimals = getDecimalPlaces(currency);
  return parseFloat(cryptoAmount.toFixed(decimals));
}

/**
 * 获取收款地址
 */
export function getPaymentAddress(currency: string): string {
  const address = PAYMENT_ADDRESSES[currency.toUpperCase() as keyof typeof PAYMENT_ADDRESSES];
  if (!address) {
    throw new Error(`Unsupported currency: ${currency}`);
  }
  return address;
}

/**
 * 获取币种的小数位数
 */
function getDecimalPlaces(currency: string): number {
  const decimalsMap: Record<string, number> = {
    BTC: 8,
    ETH: 6,
    BNB: 4,
    SOL: 4,
    DOGE: 2,
    TRX: 2,
    USDT: 2,
  };
  return decimalsMap[currency.toUpperCase()] || 8;
}

/**
 * 生成支付二维码 URL
 */
export function generateQRCodeUrl(currency: string, address: string, amount: number): string {
  // 使用 QR Code API 生成二维码
  const qrData = `${currency.toLowerCase()}:${address}?amount=${amount}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
}
