const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');
const { authenticateToken } = require('../utils/Auth');

router.post('/', async (req, res) => { //New User Registration
    try {
        const user = new User(req.body);
        await user.save();
        //Creating a JWT token when user registers a new account
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            res.status(400).json({ errors });
        } else {
            res.status(400).send(error);
        }
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a user
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Logging in
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Creating a json web token when logging in
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

            console.log("Login successful!");
            res.json({ message: 'Login successful', user, token });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/profile/:userId', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId); // req.userId comes from authenticateToken
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})



module.exports = router;