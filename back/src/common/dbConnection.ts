import { env } from "@/common/utils/envConfig";
// src/common/dbConnection.ts
import mysql from "mysql2";

// const dbConnection = mysql.createConnection({
//   host: env.DB_HOST || 'localhost', // Use environment variable for host
//   port: parseInt(env.DB_PORT || '3306', 10),
//   user: env.DB_USER || 'root',
//   password: env.DB_PASSWORD || 'secret',
//   database: env.DB_NAME || 'issue_tracker',
// });

const dbConnection = mysql.createConnection({
  host: "localhost", // Use environment variable for host
  port: "3306",
  user: "root",
  password: "secret",
  database: "issue_tracker",
});

dbConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

export default dbConnection;
