const cookie = require('cookie');

const parseCookie = function(req, res, next) {
    req.parsedCookies = cookie.parse(req.headers.cookie);
    next();
};

module.exports = parseCookie;