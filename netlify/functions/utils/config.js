import { TMDB_API_KEY } from "./constant.mjs";

const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

export { FETCH_OPTIONS };
