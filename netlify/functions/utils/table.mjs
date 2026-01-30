import { Client, TablesDB } from "appwrite";
import { APPWRITE_ENDPOINT, PROJECT_ID } from "./constant.mjs";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);
const tablesDB = new TablesDB(client);

export { tablesDB };
