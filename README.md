# MovieGpt

A Netflix-inspired React app for AI-assisted movie discovery. Built to be responsive, testable, and easy to revise — suitable to demo to interviewers.

---

## Quick summary
MovieGpt helps users discover movies via curated lists (Now Playing, Popular, Top Rated, Upcoming) and an AI-powered search that interprets natural-language mood queries. Authentication is handled with Firebase. UI follows a dark, Netflix-like design and adapts across devices.

---

## Features implemented

- Authentication
  - Firebase Email/Password sign-up, sign-in and sign-out
  - Session persistence and basic user profile (display name)
  - Password and email validation utilities

- Movie discovery
  - Now Playing, Popular, Top Rated, Upcoming lists
  - Horizontal scrollable movie cards with hover effects and shimmer loading
  - Movie poster images and basic metadata (title, release date, rating)

- AI-powered search
  - Google Gemini (GenAI) integration via utils/API/geminiAPI.js
  - Natural language mood-based search -> mapped to TMDB lookups
  - GPT result handling stored in gptSlice

- Trailers
  - YouTube trailer fetching and responsive embed (TrailerBrowse + TrailerText)
  - Random banner/trailer selection for browse page
  - Trailer state handled in movieSlice

- State management & routing
  - Redux Toolkit store with slices: userSlice, movieSlice, gptSlice, appPrefernceSlice
  - Protected routes via Routes/AuthWrapper.jsx
  - Route definitions in Routes/routes.jsx

- UX / UI
  - Dark, responsive Netflix-like design (components: Header, Background, MovieBrowse, MovieBrowseCard)
  - Toast notifications (Toast.jsx)
  - Error boundary components for graceful error UI (error/)

- Utilities & hooks
  - Dedicated hooks for API calls: usePlayMovieAPI, usePopularAPI, useTopRatedAPI, useUpcomingAPI, useTrailerAPI, useGeminiMovieSearch
  - Helper utilities in utils/ (Constant.js, Helper.js, Validate.js)
  - Firebase config in utils/API/firebase.js

---

## Project structure (relevant)
src/
- App.jsx, main.jsx
- assets/
- components/ (Background, Header, MovieBrowse, MovieBrowseCard, Shimmer, Toast, TrailerBrowse, TrailerText)
- pages/ (Browse, GptSearch, Login, ForgotPassword, NotFound)
- hooks/ (API hooks & Gemini search)
- utils/ (API, Routes, Helper, Validate)
- store/ (slices and appStore)

---

## Tech stack
- React (latest)
- Redux Toolkit + React-Redux
- Firebase Auth
- TMDB API (movie data)
- Google Gemini (GenAI)
- YouTube embeds for trailers
- Vite build tool
- Tailwind CSS (styling utilities)
- React Toastify (notifications)

---

## Responsive & accessibility notes (for revision / interview talking points)
- Mobile-first layout with horizontal scrolling lists for small screens
- Trailer embeds and banners scale using responsive containers
- Visual contrast and focusable interactive elements (headers, cards)
- Shimmer loading states improve perceived performance
- Error boundaries and inline validation improve robustness

---

## How to run (development)
1. Clone and open project:
   - cd d:\React\MovieGpt
2. Install:
   - npm install
3. Add .env with keys:
   - VITE_TMDB_API_KEY=your_tmdb_key
   - VITE_AI_API_KEY=your_gemini_key
   - (Firebase config handled in utils/API/firebase.js — add env as needed)
4. Run:
   - npm run dev

---

## Future improvements (short list)
- Forgot-password flow & email flows
- Movie details modal (cast, synopsis, reviews)
- Favorites/watchlist persistence per user
- More robust i18n and accessibility audits
- Unit + integration tests for hooks and slices

---

## Scripts
- npm run dev — start dev server
- npm run build — production build
- npm run preview — preview production build
- npm run lint — run linters

---

## License
MIT
