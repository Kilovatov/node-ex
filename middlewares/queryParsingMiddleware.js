const parseQuery = (req, res, next) => {
    const query = require('url').parse(req.url, true).query;
    req.parsedQuery = query;
    next();
};

exports.parseQuery = parseQuery;
