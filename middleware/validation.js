const middleware = require('../help/validation');

const saveBook = (req, res, next) => {
  const validationRule = {
    ispn: 'required|string',
    title: 'required|string',
    author: 'required|string',
    release: 'required|string',
    purchased: 'required|string',
    review: 'required|string',
    rating: 'required|string'
  };
  middleware(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(413).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveBook
};