var createError = require('http-errors');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hello', function (req, res, next) {
    res.send(
        {
            msg: 'hello',
            a: 12345
        }
    )
});

router.use('/user', require('./user'));

router.all('*', function (req, res, next) {
    next(createError(404, 'not api'));
});

module.exports = router;
