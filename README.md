jobtrack. is a full-stack job application tracker built with Node.js, Express, and SQLite3. jobtrack. is a personal project sister project to unemployed., utilising a similar minamilistic colour palette. It lets users sign up, log in, and manage their job applications through a clean dashboard. Sessions are handled server-side with express-session and passwords are hashed with bcrypt. The app is hosted live on Render.

Render Deployment: 
https://jobtracker-8h2y.onrender.com/pages/landing.html

Some main features of the application include:
* User authentication with session-based login, protected routes, and bcrypt password hashing.
* Full CRUD functionality — users can create, view, edit and delete job applications.
* A dashboard with live stats showing total, pending and rejected applications.
* SQLite3 database with a users and applications table.
* Multi-page structure with protected views served through Express routes, inaccessible without an active session.
* Minimal UI built with vanilla HTML, CSS and JS. Compatable with all screen sizes.
* Deployed on Render with environment variables managing session secrets and port configuration.

Future improvements:
* Persistent database hosting by replacing sqlite3 with another driver.
* Filter and search functionality on the dashboard to sort applications by status or date.
* Email notifications or reminders to follow up on pending applications.
