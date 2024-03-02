const express = require('express');
const { likePost, unlikePost } = require('../controllers/like');

const router = express.Router();

router
    .post('/', likePost)
    .delete('/', unlikePost)


module.exports = router;