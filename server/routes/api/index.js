const express = require('express');
const UserRoutes = require('./UserRoutes');
const threadRoutes = require('./threadRoutes');
const postRoutes = require('./postRoutes');
const router = express.Router();

router.use('/users', UserRoutes);
router.use('/threads', threadRoutes);
router.use('/posts', postRoutes);

module.exports = router;