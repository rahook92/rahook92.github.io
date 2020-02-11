const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    publishDate: String,
    category: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Book', bookSchema);