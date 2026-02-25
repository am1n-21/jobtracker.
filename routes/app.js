// IMPORTS
import express from 'express';
import { requireAuth } from '../middleware.js';
import { createApplicationController, fetchApplicationsController } from '../controllers/appControllers.js';

// CONSTS
export const appRouter = express.Router();

// ROUTES
appRouter.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile('dashboard.html', { root: './views' });
});

appRouter.get('/apps', requireAuth, fetchApplicationsController);

appRouter.get('/profile', requireAuth, (req, res) => {
    res.sendFile('profile.html', { root: './views' });
});

appRouter.get('/create', requireAuth, (req, res) => {
    res.sendFile('create.html', { root: './views' });
});

appRouter.post('/create', requireAuth, createApplicationController);
