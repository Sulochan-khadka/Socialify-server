const express = require('express');
const { sendRequest, getAllFollowersOfUser, acceptRequest, getAllRequestsReceived, getAllFriendsOfUser } = require('../controllers/follow');

const router = express.Router();

// * profile id used

router
    .post('/', sendRequest)
    .get('/followers/:id', getAllFollowersOfUser)
    .get('/friends/:id', getAllFriendsOfUser)
    .get('/requests/:id', getAllRequestsReceived)
    .patch('/:id', acceptRequest)

module.exports = router;