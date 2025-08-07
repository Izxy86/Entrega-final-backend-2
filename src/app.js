import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import sessionRoutes from './routes/sessions.routes.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';
import cartRoutes from './routes/carts.routes.js';
import productRoutes from './routes/products.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(initializePassport());
app.use(passport.initialize());
app.use('/api/sessions', sessionRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', purchaseRoutes);

const PORT = process.env.PORT || 8080;

connectDB();

app.get('/', (req, res) => {
  res.send('Servidor Corriendo');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
