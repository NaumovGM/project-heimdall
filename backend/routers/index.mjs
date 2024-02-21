// Все маршруты приложения
import { Router } from 'express';
import authRouters from './auth.routers.mjs';
import notificationsRouters from './notifications.routers.mjs';
import profilesRouters from './profiles.routers.mjs';
import subscriptionsRouters from './subscriptions.routers.mjs';

const router = Router();

router.use('/auth', authRouters);
router.use('/notifications', notificationsRouters);
router.use('/profiles', profilesRouters);
router.use('/subscriptions', subscriptionsRouters);

export default router;
