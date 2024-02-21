// Маршруты для уведомлений
import { Router } from 'express';
import env from '../config/env.mjs';
import NotificationController from '../controllers/notification.controller.mjs';
import checkAccessGrafana from '../middlewares/access/grafana.middleware.mjs';

const router = Router();

// Пользовательские маршруты
router.get('/', NotificationController.getNotifications);
router.get('/:id', NotificationController.getNotificationByID);
router.put('/:id', NotificationController.updateNotification);
router.delete('/:id', NotificationController.deleteNotification);

// Административные маршруты
router.post(`/${env.grafanaUrl}`, checkAccessGrafana, NotificationController.createNotificationGrafana);

export default router;
