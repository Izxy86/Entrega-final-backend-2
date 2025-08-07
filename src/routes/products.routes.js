import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/roles.middleware.js';

const router = Router();

router.post('/', authenticate('jwt'), authorizeRole('admin'), createProduct);

router.get('/', getAllProducts);

router.put('/:pid', authorizeRole('admin'), updateProduct);
router.delete('/:pid', authorizeRole('admin'), deleteProduct);

export default router;
