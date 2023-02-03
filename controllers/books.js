const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getBooks = async (req, res, next) => {
  const result = await mongodb.getDb().db("sarah").collection('books').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(lists);
  });
};

const getOne = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("sarah")
    .collection('books')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(lists[0]);
  });
};

const addBook = async (req, res) => {
  const contact = {
    ispn: req.body.ispn,
    title: req.body.title,
    author: req.body.author,
    release: req.body.release,
    purchased: req.body.purchased,
    review: req.body.review,
    rating: req.body.rating
  };
  const response = await mongodb.getDb().db('sarah').collection('books').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'There was an error while adding the contact.');
  }
};

module.exports = { getBooks, getOne, addBook };