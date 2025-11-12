// CONFIGURATION

// Spoonacular API key
// API key from https://spoonacular.com/food-api/console
const API_KEY = 'XXXX'; // Will be replaced with our actual API key

// Base URL for Spoonacular API
const API_BASE_URL = 'https://api.spoonacular.com/recipes';

// Maximum number of results to fetch
const MAX_RESULTS = 12;

// Get the search input field
const searchInput = document.getElementById('searchInput');

// Get the search button
const searchButton = document.getElementById('searchButton');

// Get the loading indicator element
const loadingIndicator = document.getElementById('loadingIndicator');

// Get the error message element
const errorMessage = document.getElementById('errorMessage');

// Get the paragraph inside error message (where error text goes)
const errorText = document.getElementById('errorText');

// Get the results section where recipe cards will appear
const resultsSection = document.getElementById('resultsSection');


