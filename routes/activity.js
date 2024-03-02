const express = require('express');
const { getAllActivitiesOfUser } = require('../controllers/activity');
const router = express.Router();

router.
    get('/', getAllActivitiesOfUser)

module.exports = router;