const mongoose = require('mongoose');
const Image = require('./images');

module.exports = new mongoose.Schema({
    headers: Array,
    paragraphs: Array,
    images: [Image]
});
