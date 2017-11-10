const jwt = require('jsonwebtoken');

const checkToken = function(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'secret_code', (err) => {
            if (err) {
                res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({success: false, message: 'No token provided.'});
    }
};

module.exports = checkToken;