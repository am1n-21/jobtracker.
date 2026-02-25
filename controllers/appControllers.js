import { getDBConnection } from "../db/db.js";

/**
 * Handles the creation and uploading of an app to the database
 */
export async function createApplicationController(req, res) {
    // Check if fields exist
    let { company, title, url, date, status, notes } = req.body;

    if (!company || !title || !url || !date || !status) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check for user in DB
    try {
        // Create connection
        const db = await getDBConnection();

        // WRITE application to DB
        const result = await db.run('INSERT INTO applications (user_id, name, title, url, date_applied, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [req.session.userId, company, title, url, date, status, notes]
        );

        // Return success
        console.log('SUCCESSFUL CREATED APPLICATION');
        res.status(200).json({ message: 'Successful creation' });
        await db.close();

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Creation failed. Please try again.' });
    }
}

/**
 * Fetches all the applications of current logged in user from the DB
 */
export async function fetchApplicationsController(req, res) {
    // Check for user in DB
    try {
        // Create connection
        const db = await getDBConnection();

        const query = 'SELECT * FROM applications WHERE user_id = ?'
        const params = [req.session.userId];

        const table = await db.all(query, params)

        // Return success
        console.log('SUCCESSFUL FETCHED APPLICATIONS');
        res.status(200).json(table);
        await db.close();

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Fetch failed. Please try again!' });
    }
}
