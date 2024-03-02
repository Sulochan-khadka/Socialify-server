const express = require('express');
const { addComment } = require('../controllers/comment');

const router = express.Router();

router
    .post('/', addComment)


module.exports = router;