// DOM
const appsContainer = document.getElementById('apps-container');

// FUNCTION DEFINITIONS
/**
 * Fetches the apps from server side
 */
async function displayApps() {
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
            <p class="company-text">${app.name}</p>
            <p class="job-text">${app.title}</p>
            <p class="date-text">${app.date_applied}</p>
            <p class="status-text" class="pending">${app.status}</p>
        </div>
        `
    });
    return;
}

async function renderStats() {

}

// FUNCTION CALLS
displayApps();