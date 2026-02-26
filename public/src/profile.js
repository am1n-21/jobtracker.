// DOM
const detailsForm = document.getElementById('details-form');
const passwordForm = document.getElementById('password-form');

// FUNCTION DEFINITIONS
// Fetch the user 
async function fetchUser() {
    try {
        const res = await fetch('/profile/user');
        const user = await res.json();

        // populate header
        document.getElementById('display-name').textContent = user.name;
        document.getElementById('display-email').textContent = user.email;
        document.getElementById('avatar').textContent = user.name.charAt(0).toUpperCase();

        // pre-fill form
        document.getElementById('name-input').value = user.name;
        document.getElementById('email-input').value = user.email;
    } catch (err) {
        console.log(err);
    }
}

// EVENT LISTENERS
// Form submit event listener 
detailsForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = {
        name: document.getElementById('name-input').value,
        email: document.getElementById('email-input').value
    }

    try {
        const res = await fetch('/profile/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            fetchUser(); 
        } else {
            const data = await res.json();
            console.log(data.error);
        }
    } catch (err) {
        console.log(err);
    }
});

// Update password
passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match.');
        return;
    }

    if (newPassword.length < 8) {
        alert('New password must be 8 or more characters');
        return;
    }

    try {
        const res = await fetch('/profile/password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPassword, newPassword })
        });

        if (res.ok) {
            passwordForm.reset();
            alert('Password updated successfully.');
        } else {
            const data = await res.json();
            alert(data.error);
        }
    } catch (err) {
        console.log(err);
    }
});

fetchUser();