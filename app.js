import express from 'express'
import connectDB from './config/db.js'
import productRoutes from './routes/product.router.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Pastry shop API is running...');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});