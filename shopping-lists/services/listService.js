import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = TRUE`;
};

const findOne = async (id) => {
  const list = await sql`SELECT * FROM shopping_lists WHERE id = ${id} AND active = TRUE`;
  return list;
};

const deactivate = async (listId) => {
  await sql`UPDATE shopping_lists SET active = FALSE WHERE id = ${listId}`;
};

const countLists = async () => {
  const result = await sql`SELECT COUNT(*) FROM shopping_lists`;
  return result.rows[0].count;
};

export { create, findAllLists, findOne, deactivate, countLists };