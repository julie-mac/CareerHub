const express = require('express');
const UserRoutes = require('./UserRoutes');

const router = express.Router();

router.use('/users', UserRoutes);

module.exports = router;