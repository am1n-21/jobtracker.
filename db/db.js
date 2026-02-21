import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';

// Connection to DB
export async function getDBConnection() {
    const dbPath = path.join('database.db');

    return open({
        filename: dbPath,
        driver: sqlite3.Database
    });
}

// Create Tables
export async function createTables() {
    const db = await getDBConnection();

    try {
        
        // Create user table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email NVARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL
            )`
        );

        // Create applications table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS applications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL REFERENCES users(id),
                name TEXT NOT NULL,
                title TEXT NOT NULL,
                url NVARCHAR NOT NULL,
                date_applied DATE NOT NULL,
                status TEXT NOT NULL DEFAULT 'applied',
                notes TEXT
            )`
        );

        await db.close();
        console.log('Tables created');
        return;
    } catch (err) {
        console.log('Error creating tables: ', err);
    }
}

// Log tables
export async function viewUsersTable() {
    const db = await getDBConnection();

    try {
        const table = await db.all('SELECT * FROM users')
        console.table(table);

    } catch (err) {
        console.log('Error viewing users: ', err);
    } finally {
        await db.close();
        return;
    }
}

export async function viewApplicationsTable() {
    const db = await getDBConnection();

    try {
        const table = await db.all('SELECT * FROM applications')
        console.table(table);

    } catch (err) {
        console.log('Error viewing applications: ', err);
    } finally {
        await db.close();
        return;
    }
}