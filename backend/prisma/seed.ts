import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  // 1. iPhone 17 Pro (using Amazon images as stable placeholders)
  const iphone = await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      description: 'The ultimate iPhone.',
      variants: {
        create: [
          { color: 'Natural Titanium', storage: '256GB', mrp: 134900, price: 127400, imageUrl: 'https://m.media-amazon.com/images/I/81c50PU+lpL._SX679_.jpg' },
          { color: 'Blue Titanium', storage: '512GB', mrp: 154900, price: 147400, imageUrl: 'https://m.media-amazon.com/images/I/81fxjeu8fdL._SX679_.jpg' },
        ],
      },
      emiPlans: {
        create: [
          { monthlyAmount: 44967, tenureMonths: 3, interestRate: 0, cashbackInfo: 'Additional cashback of ₹7,500' },
          { monthlyAmount: 22483, tenureMonths: 6, interestRate: 0, cashbackInfo: 'Additional cashback of ₹7,500' },
          { monthlyAmount: 11242, tenureMonths: 12, interestRate: 0, cashbackInfo: 'Additional cashback of ₹7,500' },
          { monthlyAmount: 5621, tenureMonths: 24, interestRate: 0, cashbackInfo: 'Additional cashback of ₹7,500' },
          { monthlyAmount: 4297, tenureMonths: 36, interestRate: 10.5, cashbackInfo: 'Additional cashback of ₹7,500' },
        ],
      },
    },
  });

  // 2. Samsung Galaxy S24 Ultra
  const samsung = await prisma.product.create({
    data: {
      slug: 'samsung-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Galaxy AI is here.',
      variants: {
        create: [
          { color: 'Titanium Gray', storage: '256GB', mrp: 129999, price: 129999, imageUrl: 'https://m.media-amazon.com/images/I/71CXhVhpM0L._SX679_.jpg' },
          { color: 'Titanium Black', storage: '512GB', mrp: 139999, price: 139999, imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-s928bzkqins/gallery/in-galaxy-s24-s928-sm-s928bzkqins-539573352' },
        ],
      },
      emiPlans: {
        create: [
          { monthlyAmount: 43333, tenureMonths: 3, interestRate: 0, cashbackInfo: 'Additional cashback of ₹5,000' },
          { monthlyAmount: 21666, tenureMonths: 6, interestRate: 0, cashbackInfo: 'Additional cashback of ₹5,000' },
          { monthlyAmount: 10833, tenureMonths: 12, interestRate: 0, cashbackInfo: 'Additional cashback of ₹5,000' },
          { monthlyAmount: 5416, tenureMonths: 24, interestRate: 0, cashbackInfo: null },
        ],
      },
    },
  });

  // 3. Google Pixel 9 Pro
  const pixel = await prisma.product.create({
    data: {
      slug: 'google-pixel-9-pro',
      name: 'Google Pixel 9 Pro',
      description: 'The pro Google phone.',
      variants: {
        create: [
          { color: 'Obsidian', storage: '256GB', mrp: 106999, price: 106999, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Google_Pixel_9_Pro_%28Obsidian%29_front.svg' },
          { color: 'Porcelain', storage: '512GB', mrp: 115999, price: 115999, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Google_Pixel_9_Pro_%28Porcelain%29_front.svg' },
        ],
      },
      emiPlans: {
        create: [
          { monthlyAmount: 35666, tenureMonths: 3, interestRate: 0, cashbackInfo: 'Additional cashback of ₹4,000' },
          { monthlyAmount: 17833, tenureMonths: 6, interestRate: 0, cashbackInfo: 'Additional cashback of ₹4,000' },
          { monthlyAmount: 8916, tenureMonths: 12, interestRate: 0, cashbackInfo: 'Additional cashback of ₹4,000' },
          { monthlyAmount: 4458, tenureMonths: 24, interestRate: 0, cashbackInfo: null },
          { monthlyAmount: 3410, tenureMonths: 36, interestRate: 10.5, cashbackInfo: null },
        ],
      },
    },
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
