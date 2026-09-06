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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// GET /api/products: Fetch all products with their default variant and base EMI starting price.
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany({
            include: {
                variants: {
                    take: 1, // Default variant
                },
                emiPlans: {
                    orderBy: {
                        monthlyAmount: 'asc',
                    },
                    take: 1, // Base EMI starting price
                },
            },
        });
        res.json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// GET /api/products/:slug: Fetch complete details of a single product by slug
router.get('/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const product = yield prisma.product.findUnique({
            where: { slug },
            include: {
                variants: true,
                emiPlans: {
                    orderBy: {
                        tenureMonths: 'asc'
                    }
                },
            },
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        console.error(`Error fetching product ${req.params.slug}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
