const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
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
        console.log("User not found");
        return res.status(404).json({ message: 'User not found' });
      }
  
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.log("Internal server error");
                return res.status(500).json({ message: 'Internal server error' });
        }
            if (!isMatch) {
                console.log("Invalid password!!");
                return res.status(401).json({ message: 'Invalid password' });
            }
        
        console.log("Login successful!");
        res.json({ message: 'Login successful', user });
      });
    } catch (error) {
        console.log("catch");
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;