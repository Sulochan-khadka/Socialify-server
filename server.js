const express = require('express');
require('dotenv').config();
const { connectMongoDB } = require('./connect');
const cors = require('cors');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const activityRoute = require('./routes/activity');
const authRoute = require('./routes/auth');
const commentRoute = require('./routes/comment');
const discoverRoute = require('./routes/discover');
const feedRoute = require('./routes/feed');
const followRoute = require('./routes/follow');
const chatRoute = require('./routes/chat');
const likeRoute = require('./routes/like');
const messageRoute = require('./routes/message');
const postRoute = require('./routes/post');
const profileRoute = require('./routes/profile');
const userRoute = require('./routes/user');
const cloudinary = require('cloudinary').v2;
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const app = express();
const apiRouter = express.Router();
cloudinary.config({
  cloud_name: 'dg2brrufl',
  api_key: '643157192656823',
  api_secret: 'KFM91Q3jdY189lOVUg1ItqxkUlU',
});
const awsConfig = {
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
};

const BUCKET = process.env.BUCKET;
const S3 = new AWS.S3(awsConfig);

let upload = multer({
  // storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      done(null, true);
    } else {
      //prevent the upload
      var newError = new Error('File type is incorrect');
      newError.name = 'MulterError';
      done(newError, false);
    }
  },
});

const uploadToS3 = (fileData) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: BUCKET,
      Key: `${Date.now().toString()}.jpg`,
      Body: fileData,
    };
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(data);
      return resolve(data);
    });
  });
};

const port = process.env.PORT;
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

apiRouter.use('/activity', activityRoute);
apiRouter.use('/auth', authRoute);
apiRouter.use('/comment', commentRoute);
apiRouter.use('/discover', discoverRoute);
apiRouter.use('/feed', feedRoute);
apiRouter.use('/follow', followRoute);
apiRouter.use('/chat', chatRoute);
apiRouter.use('/like', likeRoute);
apiRouter.use('/message', messageRoute);
apiRouter.use('/post', postRoute);
apiRouter.use('/profile', profileRoute);
apiRouter.use('/user', userRoute);
app.post('/uploads', upload.single('images'), async (req, res) => {
  console.log(req, 16);
  let url = '';
  if (req.file) {
    // for (const file of req.files) {
    const response = await uploadToS3(req.file.buffer); // Assuming uploadToS3 is a function that uploads files to S3
    url = response.Location;
    // console.log('response is: ', response);
    // }
  }
  // const getObjectParams = {
  //   Bucket: BUCKET,
  //   Key: key,
  // };
  // const command = new GetObjectCommand(getObjectParams);
  // const url = await getSignedUrl(S3, command, { expiresIn: 7200 });

  res.send(url);
});
app.get('/uploads', (req, res) => {
  res.send('done');
});
app.use('/api/v1', apiRouter);

app.get('/api/v1', (req, res) => {
  res.send('<h1> Jai Shree Ram</h1>');
});

app.get('*', function (req, res) {
  res.status(404).send('<h1>Glt jagah aa gye dost 🤭💦</h1>');
});

app.listen(port, () => {
  console.log(`Doston main chalu ho gya👋 ${port}`);
  connectMongoDB(uri);
});
