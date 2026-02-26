const express = require('express');
const axios = require('axios');
const public_users = express.Router();


// ✅ Get all books
public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/books');
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books" });
    }
});


// ✅ Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const response = await axios.get('http://localhost:5000/books');
        const books = response.data;

        if (books[isbn]) {
            return res.status(200).json(books[isbn]);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error retrieving book by ISBN" });
    }
});


// ✅ Get books by author
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;

    try {
        const response = await axios.get('http://localhost:5000/books');
        const books = response.data;

        const filteredBooks = Object.keys(books)
            .filter(key => books[key].author === author)
            .reduce((result, key) => {
                result[key] = books[key];
                return result;
            }, {});

        if (Object.keys(filteredBooks).length > 0) {
            return res.status(200).json(filteredBooks);
        } else {
            return res.status(404).json({ message: "No books found for this author" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books by author" });
    }
});


// ✅ Get books by title
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const response = await axios.get('http://localhost:5000/books');
        const books = response.data;

        const filteredBooks = Object.keys(books)
            .filter(key => books[key].title === title)
            .reduce((result, key) => {
                result[key] = books[key];
                return result;
            }, {});

        if (Object.keys(filteredBooks).length > 0) {
            return res.status(200).json(filteredBooks);
        } else {
            return res.status(404).json({ message: "No books found with this title" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books by title" });
    }
});

module.exports = public_users;
