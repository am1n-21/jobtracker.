// IMPORTS
import express from 'express';
import { registerController, loginController } from '../controllers/authControllers.js';

// CONSTS
export const authRouter = express.Router();

// ROUTES
authRouter.post('/register', registerController);
authRouter.post('/login', loginController);


