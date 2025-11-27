// ==== CONFIG ====
const MAX_RESULTS = 12;

// ==== DOM ELEMENTS ====
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const loadingIndicator = document.getElementById("loadingIndicator");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");
const resultsSection = document.getElementById("resultsSection");

// ==== UI HELPERS ====
function showLoading() {
  loadingIndicator.classList.remove("hidden");
}

function hideLoading() {
  loadingIndicator.classList.add("hidden");
}

function showError(message) {
  errorText.textContent = message;
  errorMessage.classList.remove("hidden");
}

function hideError() {
  errorMessage.classList.add("hidden");
  errorText.textContent = "";
}

function clearResults() {
  resultsSection.innerHTML = "";
}

// ==== RENDER RESULTS ====
function renderRecipes(recipes) {
  clearResults();

  if (!recipes || recipes.length === 0) {
    resultsSection.innerHTML = "<p>No recipes found. Try another search.</p>";
    return;
  }

  const cardsHtml = recipes
    .map((recipe) => {
      const title = recipe.title || "Recipe";
      const image = recipe.image || "";
      const time = recipe.readyInMinutes ?? "?";
      const servings = recipe.servings ?? "?";
      const sourceUrl = recipe.sourceUrl || "#";

      return `
        <article class="recipe-card">
          ${
            image
              ? `<img src="${image}" alt="${title}" class="recipe-image" />`
              : ""
          }
          <h2 class="recipe-title">${title}</h2>
          <p class="recipe-meta">${time} min · ${servings} servings</p>
          <a href="${sourceUrl}" target="_blank" rel="noopener" class="recipe-link">
            View full recipe
          </a>
        </article>
      `;
    })
    .join("");

  resultsSection.innerHTML = cardsHtml;
}

// ==== API CALL VIA NODE PROXY ====
async function searchRecipes() {
  const query = searchInput.value.trim();

  if (!query) {
    showError("Please enter a search term (examples: pasta, salmon, iron, vitamin C).");
    return;
  }

  hideError();
  showLoading();
  clearResults();

  const url = `/api/search?query=${encodeURIComponent(query)}&number=${MAX_RESULTS}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Missing search query.");
      }
      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }
      throw new Error("Request failed.");
    }

    const data = await response.json();
    const recipes = data.results || [];
    renderRecipes(recipes);
  } catch (err) {
    console.error("[API ERROR]", err);
    showError(err.message || "Network error. Please check your connection.");
  } finally {
    hideLoading();
  }
}

// ==== EVENT LISTENERS ====
searchButton.addEventListener("click", () => {
  searchRecipes();
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchRecipes();
  }
});
