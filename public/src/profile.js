// DOM
const logoutBtn = document.getElementById('logout-btn');

// EVENT LISTENERS
logoutBtn.addEventListener('click', async (e) => {
    try {
        window.location.href = '/auth/logout';
    } catch (err) {
        console.log(err);
    }
});