// =====================
// Config
// =====================
const API_URL = "https://randomuser.me/api/";

// =====================
// DOM Elements
// =====================
const userPhotoEl = document.getElementById("user-photo");
const userNameEl = document.getElementById("user-name");
const userEmailEl = document.getElementById("user-email");
const userCountryEl = document.getElementById("user-country");
const loaderEl = document.getElementById("loader");
const generateBtn = document.getElementById("generate-user-btn");

// =====================
// Loader helpers
// =====================
function showLoader() {
    loaderEl.textContent = "Se încarcă...";
    loaderEl.style.display = "block";
}

function hideLoader() {
    loaderEl.textContent = "";
    loaderEl.style.display = "none";
}

// =====================
// Fetch Random User
// =====================
async function fetchRandomUser() {
    console.log("Fetching random user...");
    showLoader();

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Eroare HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response:", data);

        return data.results[0];
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Nu s-a putut încărca utilizatorul. Încearcă din nou.");
        return null;
    } finally {
        hideLoader();
    }
}

// =====================
// Update UI
// =====================
function updateUserUI(user) {
    if (!user) return;

    userPhotoEl.src = user.picture.large;
    userPhotoEl.alt = `${user.name.first} ${user.name.last}`;

    userNameEl.textContent = `${user.name.first} ${user.name.last}`;
    userEmailEl.textContent = user.email;
    userCountryEl.textContent = user.location.country;
}

// =====================
// Events
// =====================
generateBtn.addEventListener("click", async () => {
    const user = await fetchRandomUser();
    updateUserUI(user);
});

// =====================
// Initial load
// =====================
document.addEventListener("DOMContentLoaded", async () => {
    const user = await fetchRandomUser();
    updateUserUI(user);
});
