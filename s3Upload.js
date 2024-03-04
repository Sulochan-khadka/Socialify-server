const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: 'AKIAV3XET4ERTGNOE6NN',
    secretAccessKey: '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',
  },
  region: 'us-east-1',
});

const uploadWithMulter = () =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: 'socialify-app-name',
      metadata: function (req, file, cb) {
        cb(null, { fieldname: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  }).array('s3Images', 5);

uploadToAws = (req, res) => {
  const upload = uploadWithMulter();

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.json({ err, msg: 'error while uploading' });
      return;
    }
    res.json({ msg: 'files uploaded', files: req.files });
  });
};
