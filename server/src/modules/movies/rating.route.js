const router = require('express').Router();
const rateMovie = require('./rating.controller');

// TODO:: delete ratings
router.route('/:id').put(rateMovie);

module.exports = router;
