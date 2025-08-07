import { Router } from 'express';
import { register } from '../controllers/sessions.controller.js';
import { login } from '../controllers/sessions.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { current } from '../controllers/sessions.controller.js';
import { logout } from '../controllers/sessions.controller.js';
import {
  requestPasswordReset,
  resetPassword
} from '../controllers/sessions.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', authenticate('jwt'), current);
router.post('/logout', logout);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

export default router;
