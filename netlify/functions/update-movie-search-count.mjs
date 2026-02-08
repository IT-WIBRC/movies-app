import { DATABASE_ID, POSTER_BASE_URL, TABLE_ID } from "./utils/constant.mjs";
import { tablesDB } from "./utils/table.mjs";
import { Query, ID } from "appwrite";

export default async (request, context) => {
  const body = await request.json();

  const searchTerm = body.searchTerm;
  const movieId = body.movieId;
  const posterPath = body.posterPath;

  const getMetricsByTerm = async (searchTerm) => {
    return tablesDB.listRows(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);
  };

  const updateMetricCountById = async (metricId, previousCount) => {
    await tablesDB.updateRow(DATABASE_ID, TABLE_ID, metricId, {
      count: previousCount + 1,
    });
  };

  const createMetric = async ({ searchTerm, movieId, posterPath }) => {
    await tablesDB.createRow(DATABASE_ID, TABLE_ID, ID.unique(), {
      searchTerm,
      count: 1,
      movie_id: movieId,
      poster_url: posterPath ? `${POSTER_BASE_URL}/${posterPath}` : "N/A", //TODO Use an utility as it's repeated here and in the MovieCard component
    });
  };

  try {
    const result = await getMetricsByTerm(searchTerm);
    if (result.rows.length > 0) {
      const metric = result.rows[0];
      await updateMetricCountById(metric.$id, metric.count);
    } else {
      await createMetric({ searchTerm, movieId, posterPath });
    }
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    });
  }
};
