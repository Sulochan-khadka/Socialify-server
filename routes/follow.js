const express = require('express');
const { sendRequest, getAllFollowersOfUser, acceptRequest, getAllRequestsReceived } = require('../controllers/follow');

const router = express.Router();

// * profile id used

router
    .post('/', sendRequest)
    .get('/:id', getAllFollowersOfUser)
    .get('/requests/:id', getAllRequestsReceived)
    .patch('/:id', acceptRequest)

module.exports = router;