const express = require('express');
const User = require('./models/User');
const config = require('./config/config');
const app = express();
const mongoose = require('mongoose');

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

app.listen(3001, () => console.log('Server listening on port 3000'));

