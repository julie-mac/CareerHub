const express = require('express');
const ApiRoutes = require('./api/index');

const router = express.Router();

router.use('/api', ApiRoutes);

module.exports = router;

