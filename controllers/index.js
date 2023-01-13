const personFunction = (req, res, next) => {
    res.json('Sarah Valdivia, my Bookworm');
};

const anotherPerson = (req, res, next) => {
    res.json('Sarah Valdivia, is the most wonderful girl in the world');
};


module.exports = (personFunction, anotherPerson);