const PROJECT_ID = Netlify.env.get("VITE_APPWRITE_PROJECT_ID");
const DATABASE_ID = Netlify.env.get("VITE_APPWRITE_DATABASE_ID");
const TABLE_ID = Netlify.env.get("VITE_APPWRITE_TABLE_ID");
const TMDB_API_KEY = Netlify.env.get("VITE_TMDB_API_KEY");
const APPWRITE_ENDPOINT = Netlify.env.get("VITE_APPWRITE_ENDPOINT");
const API_BASE_URL = Netlify.env.get("VITE_API_BASE_URL");
const POSTER_BASE_URL = Netlify.env.get("VITE_BASE_POSTER_URL");

export {
  PROJECT_ID,
  DATABASE_ID,
  TABLE_ID,
  TMDB_API_KEY,
  API_BASE_URL,
  POSTER_BASE_URL,
  APPWRITE_ENDPOINT,
};
