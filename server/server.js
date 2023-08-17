const express = require('express');
const cors = require('cors');
const path = require('path');  // <-- Import this
const config = require('./config/config');
const app = express();
const mongoose = require('mongoose');

mongoose.connect((process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/forum_db'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected…');
})
.catch(err => {
    console.log('Error connecting to the database', err);
    process.exit(1);
});

app.use(cors());
app.use(express.json()); // for parsing application/json

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));  // <-- Add this line

// Use the routes defined in your routes folder
const routes = require('./routes');
app.use(routes);
const topicsRouter = require('./routes/topics');
app.use('/topics', topicsRouter);

// Handle any request that doesn't match the ones above
app.get('*', (req, res) => {  // <-- Add this wildcard route
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(config.app.port, () => console.log(`Server listening on port ${config.app.port}`));
