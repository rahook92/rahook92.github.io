const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    url: Array,
    class: Array
});
