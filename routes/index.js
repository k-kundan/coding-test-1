const express = require('express');

const router = express.Router();

router.use('/', require('./formatter'));

module.exports = router;