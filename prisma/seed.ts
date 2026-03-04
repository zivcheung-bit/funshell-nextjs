import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始更新产品图片...');

  const updates = [
    {
      name: 'Ledger Nano X',
      imageUrl: 'https://shop.ledger.com/cdn/shop/files/Nano-X-Black_1.png?v=1724245191&width=512',
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
      imageUrl: 'https://shop.ledger.com/cdn/shop/files/Nano-S-Plus-Black_1.png?v=1724245191&width=512',
    },
    {
      name: 'Trezor One',
      imageUrl: 'https://trezor.io/content/wysiwyg/Images/Trezor_One/Trezor_One_front.png',
    },
  ];

  for (const update of updates) {
    const result = await prisma.product.updateMany({
      where: { name: update.name },
      data: { imageUrl: update.imageUrl },
    });
    console.log(`✅ ${update.name}: ${result.count} 条记录已更新`);
  }

  console.log('\n✅ 所有产品图片更新完成！');
}

main()
  .catch((e) => {
    console.error('❌ 错误:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
