const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = "mysecretshhh" //crypto.randomBytes(64).toString('hex');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authentication required' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = { authenticateToken } ;