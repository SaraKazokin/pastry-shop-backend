import express from 'express'
import connectDB from './config/db.js'
import productRoutes from './routes/product.router.js';
import userRoutes from './routes/user.router.js';
import orderRoutes from './routes/order.router.js';
import inventoryRoutes from './routes/inventory.router.js';
import reviewRoutes from './routes/review.router.js';
import errorHandler from './middleware/errorHandler.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Pastry shop API is running...');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});