import { client } from "./client";

const testConnection = async (dbName) => {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    await client.close();
  }
};

export { testConnection };
