const express = require('express');
const router = express.Router();


router.use('/auth/login', require('./auth/login'));
router.use('/auth/register', require('./auth/register'));

router.use('/user', require('./user/update'));
router.use('/user', require('./user/get'));
router.use('/users', require('./user/list'));

router.use('/order', require('./order/order'));
router.use('/table', require('./table/table'));
router.use('/menu', require('./menu/menu'));

module.exports = router;
