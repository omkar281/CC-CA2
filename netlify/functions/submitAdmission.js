const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, course } = JSON.parse(event.body);

  try {
    await pool.query(
      "INSERT INTO admissions(name, email, course) VALUES($1, $2, $3)",
      [name, email, course]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data stored successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
