const express = require('express');
const { sendRequest, getAllFollowersOfUser, acceptRequest, getAllRequestsReceived, getAllFriendsOfUser } = require('../controllers/follow');

const router = express.Router();

// * profile id used

router
    .post('/', sendRequest)
    .get('/followers', getAllFollowersOfUser)
    .get('/friends', getAllFriendsOfUser)
    .get('/requests', getAllRequestsReceived)
    .patch('/:id', acceptRequest)

module.exports = router;