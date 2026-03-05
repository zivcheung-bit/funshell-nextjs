import { PrismaClient } from '@prisma/client';
import { products } from './products-data';

const prisma = new PrismaClient();

async function main() {
  console.log('开始更新产品数据...');

  // 1. 清空现有产品
  await prisma.product.deleteMany({});
  console.log('已清空现有产品');

  // 2. 插入新产品
  for (const product of products) {
    const created = await prisma.product.create({
      data: {
        name: product.name,
        brand: product.brand,
        model: product.model,
        price: product.price,
        currency: product.currency,
        description: product.description,
        imageUrl: product.image,
        stock: product.stock,
        features: product.features,
      },
    });
    console.log(`✅ 创建产品: ${created.name}`);
  }

  console.log(`\n✅ 成功导入 ${products.length} 个产品！`);
}

main()
  .catch((e) => {
    console.error('❌ 错误:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
