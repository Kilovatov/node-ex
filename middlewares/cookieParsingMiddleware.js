const cookie = require('cookie');

exports.parseCookie = function(req, res, next) {
    req.parsedCookies = cookie.parse(req.headers.cookie);
    next();
};