import { FETCH_OPTIONS } from "./utils/config";
import { API_BASE_URL, TMDB_API_KEY } from "./utils/constant.mjs";

export default async (request, context) => {
  try {
    const query = new URL(request.url).searchParams.get("query");
    const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, FETCH_OPTIONS);

    if (!response.ok) {
      throw Error("Failed to fetch movies");
    }
    const data = await response.json();

    return new Response(JSON.stringify(data.results), {
      accept: "application/json",
    });
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    });
  }
};

export const config = {
  preferStatic: true,
};
