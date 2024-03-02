const express = require('express');
const { createOne, getAll, getOne, updateOne, deleteOne } = require('../controllers/group');

const router = express.Router();

router
    .post('/', createOne)
    .get('/', getAll)
    .get('/:id', getOne)
    .patch('/:id', updateOne)
    .delete('/:id', deleteOne)


module.exports = router;