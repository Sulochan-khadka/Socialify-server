const express = require('express');

const router = express.Router();

router
    .get('/posts')
    .get('/stories')
    .get('/suggestions')

module.exports = router;