const middleware = require('../help/validation');

const saveBook = (req, res, next) => {
  const validationRule = {
    ispn: 'required|string',
    title: 'required|string|min:10',
    author: 'required|string|min:10',
    release: 'required|string',
    purchased: 'required|string',
    review: 'required|string|min:20',
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