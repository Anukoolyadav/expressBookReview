const express = require('express');
const axios = require('axios');
const public_users = express.Router();


// ✅ Get all books
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/books');
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books" });
    }
});


// ✅ Get book by ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;

    try {
        const response = await axios.get('http://localhost:5000/books');
        const books = response.data;

        if (books[isbn]) {
            return res.status(200).json(books[isbn]);
        }

        return res.status(404).json({ message: "Book not found" });

    } catch (error) {
        return res.status(500).json({ message: "Error retrieving book" });
    }
});


// ✅ Get books by author (RETURN ARRAY)
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    try {
        const response = await axios.get('http://localhost:5000/books');
        const books = response.data;

        const filteredBooks = Object.keys(books)
            .filter(key => books[key].author === author)
            .map(key => ({
                isbn: key,
                author: books[key].author,
                title: books[key].title,
                reviews: books[key].reviews
            }));

        return res.status(200).json(filteredBooks);

    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books by author" });
    }
});


// ✅ Get books by title (RETURN ARRAY)
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;

    try {
        const response = await axios.get('http://localhost:5000/books');
        const books = response.data;

        const filteredBooks = Object.keys(books)
            .filter(key => books[key].title === title)
            .map(key => ({
                isbn: key,
                author: books[key].author,
                title: books[key].title,
                reviews: books[key].reviews
            }));

        return res.status(200).json(filteredBooks);

    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books by title" });
    }
});

module.exports = public_users;
