const express = require('express');
const { accessChat, fetchChats, createGroupChat } = require('../controllers/chat');

const router = express.Router();

router
    .post('/', accessChat)
    .post('/group/', createGroupChat)
    .get('/', fetchChats)
    // .get('/:id', getOne)
    // .patch('/:id', updateOne)
    // .delete('/:id', deleteOne)


module.exports = router;