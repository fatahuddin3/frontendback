const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// GET a single book by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// POST a new book
router.post('/', async (req, res) => {
    const { title, author, language, category } = req.body;
    const book = new Book({
        title,
        author,
        language,
        category,
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: 'Error creating book: ' + err.message });
    }
});

// PUT to update a book
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, language, category } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, language, category }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: 'Error updating book: ' + err.message });
    }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book: ' + err.message });
    }
});

module.exports = router;
