// Маршруты для профилей
import { Router } from 'express';
import ProfileController from '../controllers/profile.controller.mjs';

const router = Router();

router.post('/', ProfileController.createProfile);
router.get('/', ProfileController.getProfiles);
router.get('/:id', ProfileController.getProfileByID);
router.get('/sessions', ProfileController.getProfileSessions);
router.get('/settings', ProfileController.getProfileSettings);
router.put('/:id', ProfileController.updateProfile);
router.delete('/:id', ProfileController.deleteProfile);

export default router;
