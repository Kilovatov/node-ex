const express = require('express');
const router = express.Router();
const {User} = require('./../models');

router.param('userId', function (req, res, next, id) {
    User.find({id: id})
        .then(user => {
            req.user = user[0];
            next();
        })
        .catch(er => {
            console.log('The error occurred: ' + er);
            res.status(500).send({ error: "Internal Error" });
        });
});

router.get('/', function (req, res) {
    User
        .find({})
        .then((users) =>
            res.json(users)
        );
});

router.get('/:userId', function (req, res) {
    if (req.user) {
        res.json(req.user)
    }
    res.status(404).send({ error: "Not found" });
});

router.delete('/:userId', function (req, res) {
    if (req.user) {
        User.find(req.user).remove().exec();
        res.json(req.user)
    }
    res.status(404).send({ error: "Not found" });
});

router.post('/', function (req, res) {
    const user = req.body;
    const userDocument = new User(user);
    userDocument.save()
        .then(() => User.find({})
            .then((users) =>
                res.json(users)
            ))
        .catch(er => {
            console.log('The error occurred: ' + er);
            res.status(500).send({ error: "Internal Error" });
        });
});




module.exports = router;