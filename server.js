const express = require('express');
require('dotenv');
const { connectMongoDB } = require('./connect');
const cors = require('cors');

const activityRoute = require('./routes/activity')
const authRoute = require('./routes/auth');
const commentRoute = require('./routes/comment');
const feedRoute = require('./routes/feed');
const followRoute = require('./routes/follow');
const groupRoute = require('./routes/group');
const likeRoute = require('./routes/like');
const messageRoute = require('./routes/message');
const postRoute = require('./routes/post');
const profileRoute = require('./routes/profile');
const userRoute = require('./routes/user');

const app = express();
const apiRouter = express.Router();

// !: env not working
const port = process.env.PORT || 8080;
const uri = 'mongodb+srv://pathak:admin@cluster0.juybdyb.mongodb.net/socialify';

app.use(cors());
app.use(express.json());


apiRouter.use('/activity', activityRoute);
apiRouter.use('/auth', authRoute);
apiRouter.use('/comment', commentRoute);
apiRouter.use('/feed', feedRoute);
apiRouter.use('/follow', followRoute);
apiRouter.use('/group', groupRoute);
apiRouter.use('/like', likeRoute);
apiRouter.use('/message', messageRoute);
apiRouter.use('/post', postRoute);
apiRouter.use('/profile', profileRoute);
apiRouter.use('/user', userRoute);

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
})