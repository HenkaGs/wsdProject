import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";


const CONCURRENT_CONNECTIONS = 2;

const connectionPool = new Pool({
  hostname: "trumpet.db.elephantsql.com",
  database: "bprrlyud",
  user: "bprrlyud",
  password: "AVT6uLQLA_HRKlrcIxjDtGuCh_vHtyHu",
  port: 5432,
}, CONCURRENT_CONNECTIONS);

const sql = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.log("Unable to release database connection.");
        console.log(e);
      }
    }
  }

  return response;
};

export { sql };
