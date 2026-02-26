const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");

const public_users = express.Router();


// ✅ Task 1: Get all books using async/await with Axios
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});


// ✅ Task 2: Get book by ISBN using async/await
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;

    try {
        const response = await axios.get('http://localhost:5000/');
        const booksData = response.data;

        if (booksData[isbn]) {
            return res.status(200).json(booksData[isbn]);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving book" });
    }
});


// ✅ Task 3: Get books by Author using async/await
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    try {
        const response = await axios.get('http://localhost:5000/');
        const booksData = response.data;

        const filteredBooks = Object.keys(booksData)
            .filter(key => booksData[key].author === author)
            .map(key => ({
                isbn: key,
                author: booksData[key].author,
                title: booksData[key].title
            }));

        return res.status(200).json(filteredBooks);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books by author" });
    }
});


// ✅ Task 4: Get books by Title using async/await
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;

    try {
        const response = await axios.get('http://localhost:5000/');
        const booksData = response.data;

        const filteredBooks = Object.keys(booksData)
            .filter(key => booksData[key].title === title)
            .map(key => ({
                isbn: key,
                author: booksData[key].author,
                title: booksData[key].title
            }));

        return res.status(200).json(filteredBooks);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books by title" });
    }
});


// ✅ Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports = public_users;
