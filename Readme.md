# JKD Nutri* - Recipe Radar

A simple and user-friendly web application that allows users to search for recipes using the **Spoonacular Food API**. The app displays results as cards with images, cooking time, servings, and a link to the original recipe source.  
The focus of this MVP is fast search, clean UI, and clear loading/error handling.

---

## 👥 Team Members
- Deniss Vigovskis 
- Jurita Brunava
- Kristine Fedulova

---

## 🧩 Problem Statement
People often learn about nutrient deficiencies from blood test results, but they typically lack guidance on how to adjust their diet effectively. 
By linking an individual’s nutrient shortages with the Spoonacular API, we can generate personalised recipe recommendations that help restore nutrient balance. 
This makes dietary improvement simple, practical, and guided by real health data. 

---

## 🎯 Project Description
A simple and user-friendly web application that allows users to prepare a meal plan for themselves based on their private blood test results, when missing nutrients (minerals, vitamins, etc.)
The app searches for recipes using the Spoonacular Food API. Then displays results as a collection of cards with images, cooking time, servings, and a link to the original recipe source.
The focus of this MVP is fast search, clean UI, and clear loading/error handling.

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


