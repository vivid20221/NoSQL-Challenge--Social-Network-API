const router = require('express').Router();
// const reactionRoutes = require('./reactionRoutes');
const usersRoutes = require('./users-routes');

// router.use('/reaction', reactionRoutes);
router.use('/users', usersRoutes);

module.exports = router;
