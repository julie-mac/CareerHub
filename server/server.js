const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const config = require('./config/config');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected…');
    app.listen(config.app.port, () => console.log(`Server listening on port ${config.app.port}`));
})
.catch(err => {
    console.log('Error connecting to the database', err);
    process.exit(1);
});

app.use(cors());
app.use(express.json()); // for parsing application/json

// Create a new user
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get user by id
app.get('/api/users/:id', async (req, res) => {
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
app.patch('/api/users/:id', async (req, res) => {
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
app.delete('/api/users/:id', async (req, res) => {
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
app.post('/api/login', async (req, res) => {
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

app.listen(3001, () => console.log('Server listening on port 3000'));

