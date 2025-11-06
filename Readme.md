# Recipe Radar

A simple and user-friendly web application that allows users to search for recipes using the **Spoonacular Food API**. The app displays results as cards with images, cooking time, servings, and a link to the original recipe source.  
The focus of this MVP is fast search, clean UI, and clear loading/error handling.

---

## 👥 Team Members
- Deniss Vigovskis 
- Jurita – API/Backend
- [Name] – Testing & Documentation

---

## 🧩 Problem Statement
When users wonder *“What should I cook today?”*, the information online is scattered and time-consuming to filter.  
There is a need for a simple and reliable search tool where users can quickly find recipe ideas with essential details and filters.

---

## 🎯 Project Description
**Recipe Radar** makes recipe discovery easy by combining fast keyword search with clean presentation of results. Users can browse recipes, view essential information at a glance, and open the full recipe source for instructions.  
The MVP focuses on search and a recipe details view to deliver a smooth “from idea to plate” experience.

---

## 🔌 API
**API Name:** Spoonacular Food API  
**Documentation:** https://spoonacular.com/food-api/docs  
**Why this API?**  
It provides rich recipe data (images, ingredients, instructions, nutrition) with helpful filtering options and clear documentation — ideal for a student project demonstrating meaningful API integration.

**Main Endpoints Used (MVP):**
- `GET /recipes/complexSearch?query=<text>&number=12&addRecipeInformation=true`
- `GET /recipes/{id}/information`

---

## ✨ Core Features (MVP)
- Search recipes by keyword (e.g., *pasta*, *soup*, *salad*)
- Display results as cards: image, title, time, servings, link to source
- Recipe details view (ingredients and instructions)
- Loading and error handling states
- Basic API quota optimization (limit results + light caching)

### 📈 Roadmap (post-MVP)
- Filters: diet (vegan, vegetarian), intolerances, max ready time
- Local “favorites” (save recipes to LocalStorage)
- Basic nutrition highlights (kcal, protein, carbs, fat)
- Search input debounce & pagination

---

## 🛠️ Tech Stack
- HTML, CSS, JavaScript (Vanilla JS)
- Fetch API for communication with Spoonacular
- *(Optional)* Node.js/Express proxy for hiding API key & handling CORS

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-folder>
