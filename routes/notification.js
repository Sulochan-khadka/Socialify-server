const express = require('express');
const { getNotificationsOfUser } = require('../controllers/notification');
const router = express.Router();

router
    .get('/', getNotificationsOfUser)

module.exports = router;