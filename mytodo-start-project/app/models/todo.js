'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    title : String,
    completed : Boolean
});