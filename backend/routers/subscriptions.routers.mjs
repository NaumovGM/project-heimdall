// Маршруты для подписок
import { Router } from 'express';
import SubscriptionController from '../controllers/subscription.controller.mjs';

const router = Router();

router.post('/', SubscriptionController.createSubscription);
router.get('/', SubscriptionController.getSubscriptions);
router.get('/:id', SubscriptionController.getSubscriptionByID);
router.put('/:id', SubscriptionController.updateSubscription);

export default router;
