const express = require('express');
const UserRoutes = require('./UserRoutes');
const threadRoutes = require('./threadRoutes');
const postRoutes = require('./postRoutes');
const loginRoutes = require('./loginRoutes');
const router = express.Router();

router.use('/users', UserRoutes);
router.use('/threads', threadRoutes);
router.use('/posts', postRoutes);
router.use('/2fa', loginRoutes);

module.exports = router;