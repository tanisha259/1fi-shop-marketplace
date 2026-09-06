import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const HOST = '0.0.0.0';

// Enable cors() to accept requests from http://localhost:3000 or Vercel domains.
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      /\.vercel\.app$/ // regex to allow any vercel subdomain
    ],
  })
);

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
