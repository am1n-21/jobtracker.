// DOM
const form = document.getElementById('register-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');


// EVENT LISTENERS
form.addEventListener('submit', async (e) => {
    e.target.preventDefault();

    // Build form body
    const formBody = {
        email: emailInput.value,
        password: passwordInput.value
    }

    // Send to server
    try {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        });

        // If res was successful redirect to dashboard
        if (res.ok) {
            window.location.href = '../../views/dashboard'
        } else {
            // HANDLE Error display for front end here
        }
    } catch (err) {
        console.log(err);
    }
})