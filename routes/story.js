const express = require('express');
const { postStory, getStoriesOfFriends } = require('../controllers/story');

const router = express.Router();

router
    .post('/',postStory)
    .get('/', getStoriesOfFriends)

module.exports = router;