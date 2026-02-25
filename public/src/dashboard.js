// DOM
const appsContainer = document.getElementById('apps-container');

// FUNCTION DEFINITIONS
/**
 * Fetches the apps from server side
 */
async function fetchApps() {
    try {
        const res = await fetch('/apps');
        const data = await res.json();

        console.log(data);

        renderApps(data);
        return;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * Renders the applications onto the DOM
 *
 */
function renderApps(apps) {
    appsContainer.innerHTML = '';

    apps.forEach((app) => {
        appsContainer.innerHTML +=
        `
        <div class="app-entry">
            <div class="app-entry-left">
                <p class="company-text">${app.name}</p>
                <p class="job-text">${app.title}</p>
            </div>

            <div class="app-entry-right">
                <p class="date-text">${app.date_applied}</p>
                <span class="badge badge-pending">${app.status}</span>
                <div class="actions-div">
                    <a class="view" href="">View</a>
                    <a class="delete" data-id="${app.id}" href="">Delete</a>
            </div>
        </div>
        `
    });
    return;
}

/**
 * Fetches the statistics from the server side
 */
async function fetchStats() {
    try {
        const res = await fetch('/stats');
        const data = await res.json();
        renderStats(data);
        return;
    } catch (err) {
        console.log(err);
    }
}

/**
 * Renders the stats onto the DOM
 */

async function renderStats(data) {
    // Update each field with stat
    document.getElementById('applied').textContent = data.total;
    document.getElementById('pending').textContent = data.pending;
    document.getElementById('rejected').textContent = data.rejected;
}

// EVENT LISTENERS
document.addEventListener('click', async (e) => {
    // Check for delete button
    if (e.target.classList.contains('delete')) {
        const id = e.target.dataset.id;

        await fetch(`/delete/${id}`, {
            method: 'DELETE'
        });

        console.log('SUCCESSFUL DELETE');
        window.location.reload();
    }
});

// FUNCTION CALLS
fetchApps();
fetchStats();