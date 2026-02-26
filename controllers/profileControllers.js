import { getDBConnection } from '../db/db.js';
import bcrypt from 'bcrypt';

/**
 * Fetches the logged in user's data
 */
export async function fetchUserController(req, res) {
    try {
        const db = await getDBConnection();

        const user = await db.get(
            'SELECT id, name, email FROM users WHERE id = ?',
            [req.session.userId]
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
        await db.close();

    } catch (err) {
        console.error('Fetch user error:', err.message);
        res.status(500).json({ error: 'Failed to fetch user.' });
    }
}

/**
 * Updates the logged in user's name and email
 */
export async function updateDetailsController(req, res) {
    let { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    name = name.trim();
    email = email.trim();

    try {
        const db = await getDBConnection();

        // check email isn't already taken by another user
        const existing = await db.get(
            'SELECT id FROM users WHERE email = ? AND id != ?',
            [email, req.session.userId]
        );

        if (existing) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        await db.run(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, req.session.userId]
        );

        res.status(200).json({ message: 'Details updated.' });
        await db.close();

    } catch (err) {
        console.error('Update details error:', err.message);
        res.status(500).json({ error: 'Failed to update details.' });
    }
}

/**
 * Updates the logged in user's password
 */
export async function updatePasswordController(req, res) {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const db = await getDBConnection();

        // fetch current hashed password
        const user = await db.get(
            'SELECT password FROM users WHERE id = ?',
            [req.session.userId]
        );

        // verify current password is correct
        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Current password is incorrect.' });
        }

        // hash and save new password
        const hashed = await bcrypt.hash(newPassword, 10);
        await db.run(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashed, req.session.userId]
        );

        res.status(200).json({ message: 'Password updated.' });
        await db.close();

    } catch (err) {
        console.error('Update password error:', err.message);
        res.status(500).json({ error: 'Failed to update password.' });
    }
}