const express = require('express');
const { discoverPublicUserAndPosts, searchUsers } = require('../controllers/discover');
const router = express.Router();

router
    .get('/', discoverPublicUserAndPosts)
    .get('/search/',searchUsers);

module.exports = router;