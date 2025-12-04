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

// ===== Falling forks & knives decorative animation =====
function startFallingIcons() {
  const container = document.getElementById("headerFalling");
  if (!container) return;

  function spawn() {
    const el = document.createElement("div");
    el.className = "fall-icon";
    // choose emoji: fork+knife or fork (unicode may vary by platform)
    const choices = ["🍴", "🔪", "🍽️"]; // decorative
    el.textContent = choices[Math.floor(Math.random() * choices.length)];

    // random horizontal position
    const left = Math.random() * 100; // percent
    el.style.left = `${left}%`;

  // random size multiplier (smaller for header)
  const size = 0.6 + Math.random() * 0.9;
  el.style.fontSize = `${Math.round(12 * size + Math.random() * 8)}px`;

  // random duration (shorter for header area)
  const duration = 4 + Math.random() * 5; // seconds
  const sway = 1.4 + Math.random() * 2.2;
  el.style.animationDuration = `${duration}s, ${sway}s`;

  // random opacity variation
  el.style.opacity = 0.75 + Math.random() * 0.2;

    // append and remove after animation
    el.addEventListener("animationend", () => el.remove());

    container.appendChild(el);
  }

  // spawn at regular-ish intervals (header area shouldn't be too dense)
  setInterval(spawn, 700);
}

// start animations when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // small delay so assets/styles settle
  setTimeout(startFallingIcons, 400);
});
