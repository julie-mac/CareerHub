const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const secretKey = "shhhh";  // In production, use environment variable or another secure way

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    // Dummy user authentication
    const { username, password } = req.body;
    if (username === 'user' && password === 'pass') {
        // Generate JWT token
        const token = jwt.sign({ userId: '12345' }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Authentication required' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.userId = decoded.userId;
        next();
    });
};

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello user ${req.userId}!` });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});