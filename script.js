// ========================
// CONFIGURATION
// ========================
const API_KEY = '171ca5422580439babb045197342882b';

const API_BASE_URL = 'https://api.spoonacular.com/recipes';
const MAX_RESULTS = 12;

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const resultsSection = document.getElementById('resultsSection');


// ========================
// UI Helpers
// ========================
function showLoading() {
    loadingIndicator.classList.remove('hidden');
    hideError();
}

function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
    errorText.textContent = "";
}

function clearResults() {
    resultsSection.innerHTML = "";
}


// ========================
// API Request
// ========================
async function searchRecipes() {
    const query = searchInput.value.trim();

    if (!query) {
        showError("Please enter a search term (examples: pasta, salmon, iron, vitamin C)");
        return;
    }

    showLoading();
    clearResults();

    const url = `${API_BASE_URL}/complexSearch?query=${encodeURIComponent(query)}&number=${MAX_RESULTS}&addRecipeInformation=true&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);

        // Handle errors by HTTP status
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error("API authentication failed. Check your API key.");
            }
            if (response.status === 404) {
                throw new Error("No recipes found for your search.");
            }
            if (response.status === 429) {
                throw new Error("Rate limit reached. Try again later.");
            }
            if (response.status >= 500) {
                throw new Error("Server error. Please try again later.");
            }
            throw new Error("Something went wrong while fetching data.");
        }

        const data = await response.json();
        const recipes = data.results || [];

        renderRecipes(recipes);

    } catch (error) {
        console.error("API error:", error);
        showError(error.message);
    } finally {
        hideLoading();
    }
}


// ========================
// Render cards
// ========================
function renderRecipes(recipes) {
    if (recipes.length === 0) {
        resultsSection.innerHTML = "<p>No recipes found. Try another search.</p>";
        return;
    }

    const cards = recipes.map(recipe => `
        <article class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" />
            <h2 class="recipe-title">${recipe.title}</h2>
            <p class="recipe-meta">${recipe.readyInMinutes ?? '?'} min · ${recipe.servings ?? '?'} servings</p>
            <a href="${recipe.sourceUrl}" target="_blank" rel="noopener" class="recipe-link">View Full Recipe</a>
        </article>
    `).join("");

    resultsSection.innerHTML = cards;
}


// ========================
// Event Listeners
// ========================
searchButton.addEventListener('click', searchRecipes);

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchRecipes();
    }
});
