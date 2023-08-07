import { sql } from "../database/database.js";

const createItem = async (listId, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${listId}, ${name})`;
};

const findItemsByListId = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId}`;
};

export { createItem, findItemsByListId };