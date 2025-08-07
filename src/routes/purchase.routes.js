import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/roles.middleware.js';
import { purchaseCart } from '../controllers/purchase.controller.js';

const router = Router();

router.post(
  '/:cid/purchase',
  authenticate('jwt'),
  authorizeRole('user'),
  purchaseCart
);

export default router;
