const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.status(403).json({ message: 'Forbidden' });
        }

        console.log('Token successfully verified:', decoded);
        req.user = decoded.UserInfo.userId;  // Attach user ID
        req.username = decoded.UserInfo.username; // Attach username
        req.roles = decoded.UserInfo.roles; // Attach roles
        next();
    });
};

module.exports = verifyJWT;
