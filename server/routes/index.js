const router = require("express").Router();

router.use('/users',require('./users'));
router.use('/pets',require('./pets'));
router.use('/adoptions',require('./adoptions'));


module.exports = router;