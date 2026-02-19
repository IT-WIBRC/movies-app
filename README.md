# 🎬 **MovieGes** - Modern Movie Discovery

<div align="center">
<br />
<a href="https://youtu.be/mF2pZ1-7S74?feature=shared" target="_blank">
<img src="./public/hero.png" alt="Project Banner">
</a>
<br />

<div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

<h3 align="center">A Real-world Movie App with React 19, TailwindCss, and Appwrite</h3>

[![Netlify Status](https://api.netlify.com/api/v1/badges/00c33bbc-d2ae-42ed-a1c6-5e478ba4593e/deploy-status)](https://app.netlify.com/projects/movie-ges/deploys)

</div>

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🧠 [Technical Decisions](#technical-decisions)
4. 🔋 [Features](#features)
5. 🤸 [Quick Start](#quick-start)
6. 🧪 [Testing](#testing)
7. ✅ [Project Progress](#project-progress)
8. [Preview](#preview)

---

## Introduction

Built with **React 19** and **Tailwind CSS**, this application provides a seamless browsing experience for movie enthusiasts. It integrates with the **TMDB API** to fetch real-time movie data and leverages **Appwrite** to track and display trending movies based on user search frequency.

## Tech Stack

- **React 19**: Utilizing the latest Concurrent Rendering features and specialized hooks.
- **Tailwind CSS**: Utility-first styling for a fully responsive, modern dark-themed UI.
- **Appwrite**: Backend-as-a-Service (BaaS) for tracking trending movie analytics.
- **Netlify Functions**: Serverless functions used as an API proxy for enhanced security.
- **Vitest & React Testing Library**: For high-performance unit and integration testing.

---

## Technical Decisions

### 🎣 React 19 Hook Selections

To provide a high-performance "App-like" feel, we moved away from legacy `useEffect` patterns:

- **`useActionState`**: Manages the search lifecycle. It automatically handles the result data, the loading state (`isPending`), and ensures the UI stays resilient even if a network request fails.
- **`useTransition`**: Used to wrap search updates. This prevents the UI from freezing during heavy state changes, allowing the search input to remain snappy while the list updates.
- **`use()` Hook & Suspense**: The `TrendingList` uses the `use()` hook to read a top-level promise. Combined with `<Suspense>`, this allows us to show skeleton loaders naturally without manual `isLoading` booleans.

### ⚡ Netlify Functions (Middleware)

We chose to route API calls through **Netlify Functions** rather than calling TMDB directly:

- **Security**: API keys are kept on the server side, invisible to the client.
- **Resilience**: Centralizes error handling and response formatting before it reaches the frontend.

### 📝 Commit Convention

This project uses **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `test:`) to ensure a clear, readable version history that is easy for teams to follow.

---

## Features

👉 **Intelligent Search**: Real-time movie searching powered by a custom debounce hook and React 19 transitions.
👉 **Trending Analytics**: A dynamic sidebar showing the most searched movies, persisted via Appwrite.
👉 **UX Resilience**: If a search fails, the app preserves the previous results instead of crashing or showing a blank screen.
👉 **Skeleton Loaders**: Polished loading states using Tailwind CSS animations to reduce perceived latency.
👉 **Responsive Design**: Optimized for mobile-first interactions, avoiding horizontal overflows and layout shifts.

---

## Quick Start

### **Prerequisites**

- [Git](https://git-scm.com/), [Node.js](https://www.google.com/search?q=https://nodejs.org/), and [Bun](https://bun.com/) installed.

### **Cloning & Installation**

```bash
git clone https://github.com/IT-WIBRC/movies-app.git
cd movies-app
bun install

```

### **Environment Setup**

Create a `.env` file in the root:

```env
VITE_TMDB_API_KEY=
VITE_API_BASE_URL=

VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_TABLE_ID=

VITE_APPWRITE_PROJECT_ID =
VITE_APPWRITE_PROJECT_NAME =
VITE_APPWRITE_ENDPOINT =


VITE_BASE_POSTER_URL=

VITE_NETLIFY_FUNCTIONS_BASE_URL=http://localhost:8888/.netlify/functions
```

### **Running the Project**

```bash
bun run serve
```

---

## Testing

We prioritize stability. Our test suite covers component rendering, React 19 async logic, and side effects.

```bash
bun test:unit        # Run all tests in watch mode
bun test:unit:coverage  # run test for coverage
```

---

## Project Progress

[TODO for project path](./TODO)

## Preview

<img src="./public/preview.png" alt="Part of Home page">
