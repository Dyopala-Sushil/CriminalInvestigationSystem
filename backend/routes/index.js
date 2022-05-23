var router = require("express").Router();
const userRoute = require('./user.router');
const criminalRouter = require('./criminal.route');

router.use('/department', userRoute);
router.use('/criminal', criminalRouter);


module.exports = router;