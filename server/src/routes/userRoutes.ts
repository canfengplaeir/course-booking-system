import { Router } from 'express';
import { register, login, updateProfile } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', authenticateToken, updateProfile);

export const userRoutes = router;