const jwt = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeader(req) {
    let { authorization } = req.headers;
    if (authorization) {
        let [type, token] = authorization.split(' ');
        return (type === 'Token' || type === 'Bearer') ? token : null;
    }
    return null;
}

const auth = jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken: getTokenFromHeader
});

module.exports = auth;
