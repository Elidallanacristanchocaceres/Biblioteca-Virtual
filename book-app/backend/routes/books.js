const express = require('express');
const router = express.Router();
const { connection } = require('../db/connection');

// Get all books
router.get('/', (req, res) => {
    connection.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Add a book
router.post('/', (req, res) => {
    const { title, author } = req.body;
    connection.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Book added!');
    });
});

module.exports = router;
