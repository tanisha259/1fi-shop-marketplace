"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clear existing data
        yield prisma.emiPlan.deleteMany();
        yield prisma.variant.deleteMany();
        yield prisma.product.deleteMany();
        // 1. iPhone 17 Pro
        const iphone = yield prisma.product.create({
            data: {
                slug: 'iphone-17-pro',
                name: 'iPhone 17 Pro',
                description: 'The ultimate iPhone.',
                variants: {
                    create: [
                        { color: 'Natural Titanium', storage: '256GB', mrp: 134900, price: 127400, imageUrl: '/images/iphone-white.jpg' },
                        { color: 'Black Titanium', storage: '512GB', mrp: 154900, price: 147400, imageUrl: '/images/iphone%20black.jpg' },
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
        const samsung = yield prisma.product.create({
            data: {
                slug: 'samsung-s24-ultra',
                name: 'Samsung Galaxy S24 Ultra',
                description: 'Galaxy AI is here.',
                variants: {
                    create: [
                        { color: 'Titanium Gray', storage: '256GB', mrp: 129999, price: 129999, imageUrl: '/images/galaxy-white.jpg' },
                        { color: 'Titanium Black', storage: '512GB', mrp: 139999, price: 139999, imageUrl: '/images/galaxy-black.jpg' },
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
        const pixel = yield prisma.product.create({
            data: {
                slug: 'google-pixel-9-pro',
                name: 'Google Pixel 9 Pro',
                description: 'The pro Google phone.',
                variants: {
                    create: [
                        { color: 'Obsidian', storage: '256GB', mrp: 106999, price: 106999, imageUrl: '/images/pixel-black.jpg' },
                        { color: 'Porcelain', storage: '512GB', mrp: 115999, price: 115999, imageUrl: '/images/pixel-white.jpg' },
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
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
