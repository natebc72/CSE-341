const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getBooks = async (req, res) => {
  const result = await mongodb.getDb().db('sarah').collection('books').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOne = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('sarah')
    .collection('books')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addBook = async (req, res) => {
  const book = {
    ispn: req.body.ispn,
    title: req.body.title,
    author: req.body.author,
    release: req.body.release,
    purchased: req.body.purchased,
    review: req.body.review,
    rating: req.body.rating
  };
  const response = await mongodb.getDb().db('sarah').collection('books').insertOne(book);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'There was an error while adding the book.');
  }
};

const updateBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a book.');
  }
  const bookId = new ObjectId(req.params.id);
  const book = {
    ispn: req.body.ispn,
    title: req.body.title,
    author: req.body.author,
    release: req.body.release,
    purchased: req.body.purchased,
    review: req.body.review,
    rating: req.body.rating
  };
  const response = await mongodb
    .getDb()
    .db('sarah')
    .collection('books')
    .replaceOne({ _id: bookId }, book);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'There was an error while updating the book.');
  }
};

const deleteBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a book.');
  }
  const bookId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('sarah').collection('books').deleteOne({ _id: bookId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'There was an error while deleting the book.');
  }
};

module.exports = { getBooks, getOne, addBook, updateBook, deleteBook };