const Book = require('../models/Book');

// Controller to handle fetching all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle adding a new book
const addBook = async (req, res) => {
    const { title, author, language, category } = req.body;
    const newBook = new Book({ title, author, language, category });
    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to handle editing an existing book
const editBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, language, category } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, language, category }, { new: true });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to handle deleting a book
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    addBook,
    editBook,
    deleteBook,
};
