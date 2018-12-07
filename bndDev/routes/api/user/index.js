var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const us = [
    {
        name: 'Messi',
        age: 32,
        msg: 'Located two hours south of Sydney in the Southern Highlands of New South Wales, ...'
    },
    {
        name: 'Son',
        age: 26,
        msg: 'Located two hours south of Sydney in the'
    },
    {
        name: 'musong',
        age: 38,
        msg: 'vue success!'
    },
    {
        name: 'ki',
        age: 34,
        msg: 'crazy long kick!'
    }
];

router.get('/', function (req, res, next) {
    console.log(req.body);
    console.log(req.query);
    res.send(
        {
            users: us
        }
    )
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    console.log(req.query);
    res.send(
        {
            success: true,
            msg: 'post ok'
        }
    )
});

router.put('/', function (req, res, next) {
    console.log(req.body);
    console.log(req.query);
    res.send(
        {
            success: true,
            msg: 'put ok'
        }
    )
});

router.delete('/', function (req, res, next) {
    console.log(req.body);
    console.log(req.query);
    res.send(
        {
            success: true,
            msg: 'delete ok'
        }
    )
});





router.all('*', function (req, res, next) {
    next(createError(404, 'not api'));
});

module.exports = router;
