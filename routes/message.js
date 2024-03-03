const express = require('express');
const { allMessages, sendMessage } = require('../controllers/message');

const router = express.Router();

router
    .post('/', sendMessage)
    // .get('/', getAll)
    .get('/:id', allMessages)
    // .patch('/:id', updateOne)
    // .delete('/:id', deleteOne)


module.exports = router;