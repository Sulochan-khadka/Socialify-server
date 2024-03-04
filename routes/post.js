const express = require('express');
const {
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getAllPostsOfAProfile,
} = require('../controllers/post');

const multer = require('multer');
// const cloudinary=require('../utils/cloudinary')
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// * Profile id is used to access posts

router
  .post('/', createOne)
  .get('/all/:id', getAllPostsOfAProfile)
  .get('/:id', getOne)
  .delete('/:id', deleteOne);

module.exports = router;
