

/*

  File name : book.js
  Author's name :Vishwa Akhani
  StudentID :300913898
  App name :Favourite Book List App

*/
let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
