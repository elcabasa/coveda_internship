const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || 'your_fallback_secret_key_here';

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const headerToken = authHeader && authHeader.split(' ')[1];
    const cookieToken = req.cookies?.token;
    const token = headerToken || cookieToken;

    if (!token) {
        return res.status(401).json({ error: 'Authorization denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Authorization denied. Invalid token.' });
    }
};

const authorizedRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: `Authorization denied. Requires ${requiredRole} role.` });
        }
        next();
    };
};

module.exports = { authToken, authorizedRole, secretKey };
