const router = require('express').Router();
const userRouter = require('./users');

router.use('/users', userRouter);
router.use('/cards', require('./cards'));

module.exports = router;
