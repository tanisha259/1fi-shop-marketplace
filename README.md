# 1Fi SDE Intern Assignment - Marketplace

This repository contains the full-stack implementation of the 1Fi Marketplace feature. It is divided into a rontend and a ackend.

## ?? Tech Stack Used

**Frontend:**
- React
- Next.js (App Router)
- Tailwind CSS
- TypeScript

**Backend:**
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- TypeScript

## ?? Setup and Run Instructions

### Prerequisites
- Node.js installed
- PostgreSQL running locally (or a remote Postgres URL like NeonDB)

### Backend Setup
1. Navigate to the backend directory:
   `bash
   cd backend
   `
2. Install dependencies:
   `bash
   npm install
   `
3. Set up the .env file with your database connection string:
   `env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
   PORT=5000
   `
4. Push the schema to the database and generate the Prisma client:
   `bash
   npx prisma db push
   `
5. Seed the database with the mock products and EMI plans:
   `bash
   npm run seed
   `
6. Start the backend development server:
   `bash
   npm run dev
   `

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   `bash
   cd frontend
   `
2. Install dependencies:
   `bash
   npm install
   `
3. Start the Next.js development server:
   `bash
   npm run dev
   `
4. Open your browser and navigate to http://localhost:3000. Use Developer Tools to view the app in mobile resolution for the best experience.

## ??? Schema Used (Prisma)

`prisma
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
`

## ?? API Endpoints

### 1. Get All Products
**Endpoint:** GET /api/products

**Description:** Fetches a list of all products in the marketplace, including their default variant and the base starting EMI plan.

**Example Response:**
`json
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
        "imageUrl": "https://example.com/image.jpg"
      }
    ],
    "emiPlans": [
      {
        "id": "emi-uuid",
        "productId": "uuid-string",
        "monthlyAmount": 4297,
        "tenureMonths": 36,
        "interestRate": 10.5,
        "cashbackInfo": "Additional cashback of ?7,500"
      }
    ]
  }
]
`

### 2. Get Single Product Details
**Endpoint:** GET /api/products/:slug

**Description:** Fetches the complete details for a single product based on its slug, including ALL associated variants and ALL available EMI plans sorted by tenure.

**Example Response:**
`json
{
  "id": "uuid-string",
  "slug": "iphone-17-pro",
  "name": "iPhone 17 Pro",
  "description": "The ultimate iPhone.",
  "variants": [
    {
      "color": "Natural Titanium",
      "storage": "256GB",
      "mrp": 134900,
      "price": 127400,
      "imageUrl": "https://example.com/image-1.jpg"
    }
  ],
  "emiPlans": [
    {
      "monthlyAmount": 44967,
      "tenureMonths": 3,
      "interestRate": 0,
      "cashbackInfo": "Additional cashback of ?7,500"
    }
  ]
}
`
