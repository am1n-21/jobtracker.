// DOM
const form = document.getElementById('create-form');
const companyInput = document.getElementById('company-input');
const titleInput = document.getElementById('title-input');
const urlInput = document.getElementById('url-input');
const dateInput = document.getElementById('date-input');
const statusInput = document.getElementById('status-input');
const notesInput = document.getElementById('notes-input');

// EVENT LISTENERS
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Build a application body
    const applicationBody = {
        company: companyInput.value,
        title: titleInput.value,
        url: urlInput.value,
        date: dateInput.value,
        status: statusInput.value,
        notes: notesInput.value
    }

    // Send to server
    try {
        const res = await fetch('/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(applicationBody)
        });

        // If res was successful redirect to dashboard
        if (res.ok) {
            window.location.href = '/dashboard'
        } else {
            // HANDLE Error display for front end here
        }
    } catch (err) {
        console.log(err);
    }
});