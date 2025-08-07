import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/roles.middleware.js';
import { addProductToCart } from '../controllers/carts.controller.js';
import { purchaseCart } from '../controllers/purchase.controller.js';

const router = Router();

router.post(
  '/:cid/products/:pid',
  authenticate('jwt'),
  authorizeRole('user'),
  addProductToCart
);

router.post(
  '/:cid/purchase',
  authenticate('jwt'),
  authorizeRole('user'),
  purchaseCart
);

export default router;
