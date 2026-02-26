// IMPORTS
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
dotenv.config();

import { appRouter } from './routes/app.js';
import { authRouter } from './routes/auth.js';
import { profileRouter } from './routes/profile.js';
import { createTables } from './db/db.js';

// CONSTS
const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
createTables();

// MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// ROOT ROUTE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// ROUTERS
app.use('/', appRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));