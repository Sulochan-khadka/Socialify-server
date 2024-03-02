const express = require('express');
const { createOne, getOne, updateOne, deleteOne, getAllPostsOfAProfile } = require('../controllers/post');

const router = express.Router();

// * Profile id is used to access posts

router
    .post('/', createOne)
    .get('/:id', getAllPostsOfAProfile)
    .get('/:id', getOne)
    .delete('/:id', deleteOne)


module.exports = router;