import { DATABASE_ID, TABLE_ID } from "./utils/constant.mjs";
import { Query } from "appwrite";
import { tablesDB } from "./utils/table.mjs";

export default async (request, context) => {
  try {
    const result = await tablesDB.listRows(DATABASE_ID, TABLE_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return new Response(JSON.stringify(result.rows), {
      accept: "application/json",
    });
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    });
  }
};
