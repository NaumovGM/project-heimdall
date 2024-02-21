// Маршруты для авторизации
import { Router } from 'express';
import AuthController from '../controllers/auth.controller.mjs';

const router = Router();

router.post('/register', AuthController.createProfile);
router.post('/login', AuthController.createSession);
router.put('/refresh', AuthController.updateTokens);
router.delete('/logout', AuthController.deleteSession);

export default router;
