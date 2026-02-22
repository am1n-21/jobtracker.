// IMPORTS
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors'
dotenv.config();

import { appRouter } from './routes/app.js';
import { authRouter } from './routes/auth.js';

import { createTables, viewUsersTable, viewApplicationsTable } from './db/db.js';

// CONSTS
const PORT = process.env.PORT || 3000; 
const app = express();
app.use(cors());

// MIDDLEWARE
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

viewUsersTable();

// SERVER
app.use('/', appRouter);
app.use('/auth', authRouter);
app.listen(PORT, () => console.log('Listening on port'));