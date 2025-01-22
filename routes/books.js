import express from "express"
import pool from "../db/connection.js"

const router = express.Router()

// Get all books
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books")
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add a book
router.post("/", async (req, res) => {
  const { title, author } = req.body
  try {
    await pool.query("INSERT INTO books (title, author) VALUES (?, ?)", [title, author])
    res.status(201).json({ message: "Book added successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router

