// DOM
const id = new URLSearchParams(window.location.search).get('id');
const form = document.getElementById('edit-form');
const deleteBtn = document.getElementById('delete-btn');

// FUNCTION DEFINITIONS
async function fetchApplication() {
    try {
        const res = await fetch(`/application/${id}`);
        const app = await res.json();

        document.getElementById('company-input').value = app.name;
        document.getElementById('title-input').value = app.title;
        document.getElementById('url-input').value = app.url;
        document.getElementById('date-input').value = app.date_applied;
        document.getElementById('status-input').value = app.status;
        document.getElementById('notes-input').value = app.notes || '';
    } catch (err) {
        console.log(err);
    }
}

// EVENT LISTENERS
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = {
        company: document.getElementById('company-input').value,
        title: document.getElementById('title-input').value,
        url: document.getElementById('url-input').value,
        date: document.getElementById('date-input').value,
        status: document.getElementById('status-input').value,
        notes: document.getElementById('notes-input').value
    }

    try {
        const res = await fetch(`/application/edit/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            window.location.href = '/dashboard';
        }
    } catch (err) {
        console.log(err);
    }
});

deleteBtn.addEventListener('click', async () => {
    try {
        const res = await fetch(`/application/delete/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            window.location.href = '/dashboard';
        }
    } catch (err) {
        console.log(err);
    }
});

fetchApplication();