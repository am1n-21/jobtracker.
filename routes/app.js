// IMPORTS
import express from 'express';
import { requireAuth } from '../middleware.js';

// CONSTS
export const appRouter = express.Router();

// ROUTES
appRouter.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile('dashboard.html', { root: './views' });
});

appRouter.get('/profile', requireAuth, (req, res) => {
    res.sendFile('profile.html', { root: './views' });
});
