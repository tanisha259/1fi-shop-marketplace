# 1Fi Marketplace

A full-stack marketplace prototype for browsing products, comparing variants, and selecting EMI plans backed by mutual funds.

## Features

- Marketplace listing with product names, storage options, and available EMI tenures.
- Product detail pages with variant selection and pricing.
- EMI plan selection with tenure, monthly amount, interest rate, and cashback details.
- Responsive Next.js interface designed for mobile-first browsing.
- PostgreSQL persistence through Prisma ORM.

## Setup and Run Instructions

### Prerequisites

- Node.js 18 or later
- PostgreSQL running locally or a hosted PostgreSQL database

### 1. Configure the database

Create `backend/.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
PORT=5000
```

### 2. Install and start the backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Install and start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The frontend is configured to fetch product data from the backend at `http://localhost:5000`.

### Production commands

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

## API Endpoints

All endpoints return JSON. The backend base URL is `http://localhost:5000` during local development.

### Health check

`GET /api/health`

Example response:

```json
{
  "status": "ok"
}
```

### Get all products

`GET /api/products`

Returns every product with its first variant and the EMI plan with the lowest monthly amount. This shape is used by the marketplace listing.

Example response:

```json
[
  {
    "id": "uuid-string",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "description": "The ultimate iPhone.",
    "variants": [
      {
        "id": "variant-uuid",
        "productId": "uuid-string",
        "color": "Natural Titanium",
        "storage": "256GB",
        "mrp": 134900,
        "price": 127400,
        "imageUrl": "/images/iphone-white.jpg"
      }
    ],
    "emiPlans": [
      {
        "id": "emi-uuid",
        "productId": "uuid-string",
        "monthlyAmount": 4297,
        "tenureMonths": 36,
        "interestRate": 10.5,
        "cashbackInfo": "Additional cashback of ₹7,500"
      }
    ]
  }
]
```

### Get product details

`GET /api/products/:slug`

Returns all variants and all EMI plans for the requested product. EMI plans are sorted by `tenureMonths` in ascending order.

Example request:

```text
GET http://localhost:5000/api/products/iphone-17-pro
```

Example response:

```json
{
  "id": "uuid-string",
  "slug": "iphone-17-pro",
  "name": "iPhone 17 Pro",
  "description": "The ultimate iPhone.",
  "variants": [
    {
      "id": "variant-uuid",
      "productId": "uuid-string",
      "color": "Natural Titanium",
      "storage": "256GB",
      "mrp": 134900,
      "price": 127400,
      "imageUrl": "/images/iphone-white.jpg"
    }
  ],
  "emiPlans": [
    {
      "id": "emi-uuid",
      "productId": "uuid-string",
      "monthlyAmount": 44967,
      "tenureMonths": 3,
      "interestRate": 0,
      "cashbackInfo": "Additional cashback of ₹7,500"
    }
  ]
}
```

If the slug does not exist, the endpoint returns:

```json
{
  "error": "Product not found"
}
```

with HTTP status `404`. Database or server failures return `500` with `{ "error": "Internal server error" }`.

## Tech Stack

### Frontend

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4

### Backend

- Node.js
- Express 4
- TypeScript
- Prisma 5
- PostgreSQL
- CORS and dotenv

## Database Schema

The schema is defined in `backend/prisma/schema.prisma` and contains three related models:

```prisma
model Product {
  id          String     @id @default(uuid())
  slug        String     @unique
  name        String
  description String
  variants    Variant[]
  emiPlans    EmiPlan[]
}

model Variant {
  id        String  @id @default(uuid())
  productId String
  color     String
  storage   String
  mrp       Int
  price     Int
  imageUrl  String
  product   Product @relation(fields: [productId], references: [id])
}

model EmiPlan {
  id            String  @id @default(uuid())
  productId     String
  monthlyAmount Int
  tenureMonths  Int
  interestRate  Float
  cashbackInfo  String?
  product       Product @relation(fields: [productId], references: [id])
}
```

`Product` is the parent record. Each product can have multiple `Variant` records for color, storage, pricing, and images, and multiple `EmiPlan` records for available payment options.
