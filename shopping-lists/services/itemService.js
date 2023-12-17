import { sql } from "../database/database.js";

const createItem = async (listId, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${listId}, ${name})`;
};

const findItemsByListId = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} ORDER BY collected, name ASC`;
};

const markAsCollected = async (itemId) => {
  await sql`UPDATE shopping_list_items SET collected = TRUE WHERE id = ${itemId}`;
};

const countItems = async () => {
  const results = await sql`SELECT * FROM shopping_list_items`;
  if (results && results.length > 0) {

    return results;
  }
  return false;
};

export { createItem, findItemsByListId, markAsCollected, countItems };