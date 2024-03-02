const express = require('express');
const { createOne, getAll, getOne, updateOne, deleteOne } = require('../controllers/message');

const router = express.Router();

router
    .post('/', createOne)
    .get('/', getAll)
    .get('/:id', getOne)
    .patch('/:id', updateOne)
    .delete('/:id', deleteOne)


module.exports = router;