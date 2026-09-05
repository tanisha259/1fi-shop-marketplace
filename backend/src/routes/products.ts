import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/products: Fetch all products with their default variant and base EMI starting price.
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
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
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:slug: Fetch complete details of a single product by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
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
  } catch (error) {
    console.error(`Error fetching product ${req.params.slug}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
