import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = TRUE`;
};

const findOne = async (id) => {
  const list = await sql`SELECT * FROM shopping_lists WHERE id = ${id} AND active = TRUE`;
  return list[0];
};

export { create, findAllLists, findOne };