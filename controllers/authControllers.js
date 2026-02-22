// IMPORTS
import validator from 'validator';
import { getDBConnection } from '../db/db.js';
import bcrypt from 'bcrypt';

/**
 * Handles a new user register
 * 
 * AUTHORIZATION
 * 1. Check all fields exist
 * 2. Trim whitespace
 * 3. Use regex on name
 * 4. Validate email
 * 5. Salt and hash password
 */
export async function registerController(req, res) {
    // Authorization
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    name = name.trim();
    email = email.trim();

    const regex = new RegExp('^[a-zA-Z ]{1,30}$');
    if (!regex.test(name)) {
        return res.status(400).json({ error: 'Invalid name format.' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Add to DB
    try {
        // Create connection
        const db = await getDBConnection();

        // Check if email is already in use
        const existing = await db.get('SELECT id FROM users WHERE email = ?', [email]);
        if (existing) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        // Salt and hash the password
        const hashed = await bcrypt.hash(password, 10);

        // Register user to DB and create session
        const result = await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashed]
        );
        req.session.userId = result.lastID;

        // Return success
        console.log('SUCCESSFUL REGISTER');
        res.status(201).json({ message: 'User registered', userId: req.session.userId });
        await db.close();

    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
}

// Handles a user login
export async function loginController(req, res) {
    // Check if fields exist
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check for user in DB
    try {
        // Create connection
        const db = await getDBConnection();

        // Find user in DB
        const existing = await db.get('SELECT id, password FROM users WHERE email = ?', [email]);
        if (!existing) {
            return res.status(400).json({ error: 'Email is not registered.' });
        }

        // Check if passwords match
        const compare = await bcrypt.compare(password, existing.password);
        if (!compare) {
            return res.status(400).json({ error: 'The password was incorrect.' });
        }

        req.session.userId = existing.id;

        // Return success
        console.log('SUCCESSFUL REGISTER');
        res.status(200).json({ message: 'Successful login', userId: existing.id });
        await db.close();

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
}