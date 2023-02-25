const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

const port = process.env.PORT || 7200
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));


//Configuration for Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//this checks to see if user has been authenticated before they can see other pages
app.get('/books', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
})

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

//For error handling
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exceptions ${err}` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
      } else {
        app.listen(port);
        console.log(`Connected to Sarah's Book-Database and listening on ${port}`);
      }
});

