// IMPORTS
import express from 'express';
import { registerController, loginController } from '../controllers/authControllers.js';

// CONSTS
export const authRouter = express.Router();

// ROUTES
authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/pages/landing.html');
});


