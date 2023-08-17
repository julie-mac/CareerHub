const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const app = express();
const mongoose = require('mongoose');
const PORT = (process.env.PORT || config.app.port);

mongoose.connect((process.env.MONGODB_URI || `mongodb://${config.db.host}/${config.db.name}`), {
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

// Use the routes defined in your routes folder
const routes = require('./routes');
app.use(routes);
const topicsRouter = require('./routes/topics');
app.use('/topics', topicsRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
