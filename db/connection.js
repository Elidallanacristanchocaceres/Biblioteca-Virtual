// Utilizamos ES modules en lugar de CommonJS
import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_library",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool

