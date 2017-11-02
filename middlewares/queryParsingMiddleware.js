const parseQuery = (req, res, next) => {
    const query = require('url').parse(req.url, true).query;
    req.parsedQuery = query;
    next();
};

module.exports = parseQuery;
