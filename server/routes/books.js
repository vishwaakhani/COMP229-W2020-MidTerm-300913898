
/*

  File name : books.js
  Author's name :Vishwa Akhani
  StudentID :300913898
  App name :Favourite Book List App
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { update } = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  console.log('called')
  res.render('books/add', {
    title: 'Add Book'
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  // adding new book in books collection
  new book({
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  })
    .save()
    .then(saved => {
      res.redirect('/books')
    })
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  book.findById(req.params.id, (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'Update Book',
        books: books
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  book.findOne({ _id: req.params.id })
    .then(updated => {
      updated.Title = req.body.title
      updated.Price = req.body.price
      updated.Author = req.body.author
      updated.Genre = req.body.genre
      updated.save()
        .then(update => {
          res.redirect('/books')
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  book.findByIdAndRemove(req.params.id)
    .then(deleted => {
      res.redirect('/books')
    })
    .catch(err => {
      console.log(err);
    })
});


module.exports = router;
