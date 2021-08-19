const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if(!token) {
        // Unauthorized client error
        return res.status(401).json({ msg: "No token, authorization denied"});
    }

    try {
        if (process.env.NODE_ENV === 'production') {
            var JWTSecret = process.env.jwtSecret;
        }
        else {
            var JWTSecret = config.get('jwtSecret');
        }

        // Verify token
        const decoded = jwt.verify(token, JWTSecret);

        // Add user from payload
        req.user = decoded;

        next();
    }
    catch(e) {
        res.status(400).json({ msg: 'Token is not valid'});
    }
}

module.exports = auth;