const express = require('express');
const { createOne, getAll, getOne, updateOne, deleteOne } = require('../controllers/profile');

const router = express.Router();

// * userid is used to access profile

router
    // .post('/', createOne)
    // .get('/', getAll)
    .get('/:id', getOne)
    .patch('/', updateOne)
    // .delete('/:id', deleteOne)


module.exports = router;