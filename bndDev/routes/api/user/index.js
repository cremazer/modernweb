var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const User = require('../../../models/users');

router.get('/', function (req, res, next) {
    User.find()
        .then(r => {
            res.send({users: r})
        })
        .catch(e => {
            res.send({
                success: false
            })
        })
});

router.post('/', function (req, res, next) {
    const {name, age} = req.body;
    const u = new User({
        name: name,
        age: age
    });
    u.save()
        .then(r => {
            res.send({
                success: true, msg: r
            })
        })
        .catch(e => {
            res.send({
                success: false,
                msg: e.message
            });
        });
});

router.put('/:id', function (req, res, next) {
    const id = req.params.id;
    const {name, age} = req.body;
    User.updateOne({ _id: id }, { $set: { name, age } })
        .then(r => {
            res.send({
                success: true, msg: r
            })
        })
        .catch(e => {
            res.send({
                success: false,
                msg: e.message
            });
        });
});

router.delete('/:id', function (req, res, next) {
    const id = req.params.id;
    User.deleteOne({ _id: id })
        .then(r => {
            res.send({
                success: true, msg: r
            })
        })
        .catch(e => {
            res.send({
                success: false,
                msg: e.message
            });
        });
});

router.all('*', function (req, res, next) {
    next(createError(404, 'not api'));
});

module.exports = router;
