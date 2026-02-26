// IMPORTS
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors'
dotenv.config();

import { appRouter } from './routes/app.js';
import { authRouter } from './routes/auth.js';
import { profileRouter } from './routes/profile.js'

import { createTables, viewUsersTable, viewApplicationsTable } from './db/db.js';
import { profileRouter } from './routes/profile.js';

// CONSTS
const PORT = process.env.PORT || 3000; 
const app = express();
app.use(cors());

createTables()

// MIDDLEWARE
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// ROOT ROUTE
app.get('/', (req, res) => {
    res.sendFile('landing.html');
});

// SERVER
app.use('/', appRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.listen(PORT, () => console.log('Listening on port'));