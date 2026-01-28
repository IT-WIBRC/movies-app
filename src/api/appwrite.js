import { Client, TablesDB, Query, ID } from "appwrite";
import {
  APPWRITE_ENDPOINT,
  DATABASE_ID,
  POSTER_BASE_URL,
  PROJECT_ID,
  TABLE_ID,
} from "./constant";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);
const tablesDB = new TablesDB(client);

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
  await await tablesDB.createRow(DATABASE_ID, TABLE_ID, ID.unique(), {
    searchTerm,
    count: 1,
    movie_id: movieId,
    poster_url: `${POSTER_BASE_URL}/${posterPath}`, //TODO Use an utility as it's repeated here and in the MovieCard component
  });
};

export const updateSearchCount = async (searchTerm, movieId, posterPath) => {
  try {
    const result = await getMetricsByTerm(searchTerm);
    if (result.rows.length > 0) {
      const metric = result.rows[0];
      await updateMetricCountById(metric.$id, metric.count);
    } else {
      await createMetric({ searchTerm, movieId, posterPath });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await tablesDB.listRows(DATABASE_ID, TABLE_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};
