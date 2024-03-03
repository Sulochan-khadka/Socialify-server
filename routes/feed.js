const express = require('express');
const { getAllFeedPosts, getStories, getSuggestions } = require('../controllers/feed');

const router = express.Router();

router
    .get('/posts/:id', getAllFeedPosts)
    .get('/stories',getStories)
    .get('/suggestions', getSuggestions)

module.exports = router;