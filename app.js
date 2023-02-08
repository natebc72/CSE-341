const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
//const createError = require('http-errors');
//const path = require('path');
const cors = require('cors');
//const {signupValidation, loginValidation} = require('./validation');


const port = process.env.PORT || 7200
const app = express();

app
  .use(bodyParser.json())

  .use(bodyParser.urlencoded({
    extended: true
  }))

  .use(cors())

  .get('/', (req, res)=> {
    res.send('Node js file upload rest apis');
  })

  //.post('/register', signupValidation, (req, res, next)=> {
    //your registration code
  //})

  //.post('/login', loginValidation, (req, res, next) => {
    //your login code
  //})

  .use((err, req, res, next) => {
    res.setHeader('Acess-Control-Allow-Origin', '*');
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,});
    next();
  
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
      } else {
        app.listen(port);
        console.log(`Connected to Sarah's Book-Database and listening on ${port}`);
      }
});

