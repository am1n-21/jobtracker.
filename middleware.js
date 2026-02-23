// Checks if the session is active and has a valid userId
export function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        // Session exists and lets user through
        next();
    } else {
        // Send user back if session doesn't exist
        res.redirect('/pages/login.html');
    }
}