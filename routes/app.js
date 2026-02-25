// IMPORTS
import express from 'express';
import { requireAuth } from '../middleware.js';
import { 
    createApplicationController, 
    fetchApplicationsController, 
    fetchStatsController,
    deleteAppController,
    fetchSingleApplicationController,
    editApplicationController
} from '../controllers/appControllers.js';

// CONSTS
export const appRouter = express.Router();

// ROUTES
appRouter.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile('dashboard.html', { root: './views' });
});

appRouter.get('/apps', requireAuth, fetchApplicationsController);
appRouter.get('/stats', requireAuth, fetchStatsController);

appRouter.get('/profile', requireAuth, (req, res) => {
    res.sendFile('profile.html', { root: './views' });
});

appRouter.get('/edit', requireAuth, (req, res) => {
    res.sendFile('edit.html', { root: './views' });
});

appRouter.get('/create', requireAuth, (req, res) => {
    res.sendFile('create.html', { root: './views' });
});

appRouter.get('/application/:id', requireAuth, fetchSingleApplicationController);
appRouter.put('/application/edit/:id', requireAuth, editApplicationController);
appRouter.delete('/application/delete/:id', requireAuth, deleteAppController);

appRouter.post('/create', requireAuth, createApplicationController);