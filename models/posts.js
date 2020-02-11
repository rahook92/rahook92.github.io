const mongoose = require('mongoose');
const Content = require('./content');

const postSchema = new mongoose.Schema({
    date: String,
    title: String,
    contents: [Content],
    tags: Array
});

module.exports = mongoose.model('Post', postSchema);


