const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {passport} = require('./../middlewares');

const users = [{
    'email': 'a@example.com',
    'username': 'aaa',
    'password': 'test123'
}];

    router.post('/auth', passport.authenticate('local', {session: false}), function (req, res) {
        const cred = req.body;
        const user = users.filter(user => (cred.username === user.username && cred.password === user.password))[0];
        if (user) {
            const payload = {'name': user.username, 'email': user.email};
            const token = jwt.sign(payload, 'secret_code', {expiresIn: 30});
            console.log(user);
            res.json(
                {
                    "code": 200,
                    "message": "OK",
                    "data": {
                        "user": {
                            "email": user.email,
                            "username": user.username
                        }
                    },
                    "token": token
                }
            );
        } else {
            res.json(
                {
                    "code": 404,
                    "message": "Not Found",
                    "data": {
                        'msg': 'No such combination of username and password'
                    }
                }
            );
        }
    });

router.get('/auth/facebook',
    passport.authenticate('facebook'));

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/twitter',
    passport.authenticate('twitter'));


module.exports = router;