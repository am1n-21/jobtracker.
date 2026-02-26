import express from 'express';
import { requireAuth } from '../middleware.js';
import {
    fetchUserController,
    updateDetailsController,
    updatePasswordController
} from '../controllers/profileControllers.js';

export const profileRouter = express.Router();

profileRouter.get('/user', requireAuth, fetchUserController);
profileRouter.put('/update', requireAuth, updateDetailsController);
profileRouter.put('/password', requireAuth, updatePasswordController);