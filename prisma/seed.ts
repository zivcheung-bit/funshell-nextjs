import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始填充数据库...');

  // 清空现有数据
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.apiKey.deleteMany();

  console.log('✅ 清空现有数据完成');

  // 创建产品
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Ledger Nano X',
        brand: 'Ledger',
        model: 'Nano X',
        description: '支持蓝牙的高级硬件钱包，可存储超过5500种加密货币',
        price: 1299,
        currency: 'HKD',
        stock: 50,
        imageUrl: 'https://example.com/ledger-nano-x.jpg',
        features: ['蓝牙连接', '支持5500+币种', '100个应用', '电池续航8小时'],
        isActive: true,
      },
      {
        name: 'Ledger Nano S Plus',
        brand: 'Ledger',
        model: 'Nano S Plus',
        description: '经济实惠的硬件钱包，支持5500+种加密货币',
        price: 799,
        currency: 'HKD',
        stock: 100,
        imageUrl: 'https://example.com/ledger-nano-s-plus.jpg',
        features: ['USB-C连接', '支持5500+币种', '100个应用', '大屏幕'],
        isActive: true,
      },
      {
        name: 'Trezor Model T',
        brand: 'Trezor',
        model: 'Model T',
        description: '带触摸屏的高级硬件钱包，支持1000+种加密货币',
        price: 1899,
        currency: 'HKD',
        stock: 30,
        imageUrl: 'https://example.com/trezor-model-t.jpg',
        features: ['彩色触摸屏', '支持1000+币种', 'MicroSD卡槽', '开源固件'],
        isActive: true,
      },
      {
        name: 'Trezor One',
        brand: 'Trezor',
        model: 'One',
        description: '经典硬件钱包，安全可靠，支持1000+种加密货币',
        price: 599,
        currency: 'HKD',
        stock: 80,
        imageUrl: 'https://example.com/trezor-one.jpg',
        features: ['按钮操作', '支持1000+币种', 'OLED显示屏', '开源固件'],
        isActive: true,
      },
      {
        name: 'Coldcard Mk4',
        brand: 'Coldcard',
        model: 'Mk4',
        description: '专注于比特币的超安全硬件钱包',
        price: 1199,
        currency: 'HKD',
        stock: 20,
        imageUrl: 'https://example.com/coldcard-mk4.jpg',
        features: ['仅支持BTC', 'MicroSD卡', '安全元件', '气隙签名'],
        isActive: true,
      },
    ],
  });

  console.log(`✅ 创建了 5 个产品`);

  // 创建测试 API Key
  const testApiKey = await prisma.apiKey.create({
    data: {
      key: 'fsk_test_key_for_development_only',
      name: 'Test Agent',
      email: 'test@funshell.io',
      agentType: 'claude',
      description: '开发测试用 API Key',
      isActive: true,
    },
  });

  console.log(`✅ 创建了测试 API Key: ${testApiKey.key}`);

  console.log('\n🎉 数据库填充完成！');
  console.log('\n📋 产品列表：');
  console.log('  - Ledger Nano X (1299 HKD, 库存: 50)');
  console.log('  - Ledger Nano S Plus (799 HKD, 库存: 100)');
  console.log('  - Trezor Model T (1899 HKD, 库存: 30)');
  console.log('  - Trezor One (599 HKD, 库存: 80)');
  console.log('  - Coldcard Mk4 (1199 HKD, 库存: 20)');
  console.log('\n🔑 测试 API Key:');
  console.log(`  ${testApiKey.key}`);
}

main()
  .catch((e) => {
    console.error('❌ 错误:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
