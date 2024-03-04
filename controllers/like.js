const Activity = require('../models/activity');
const Like = require('../models/like');
const Post = require('../models/post');

async function likePost(req, res) {
  const postId = req.body.post;
  const userId = req.body.user;
  console.log('the user id is', userId);
  try {
    //checking if user has already liked post
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      return res
        .status(400)
        .json({ message: 'User has already liked the post' });
    }

    const newLike = new Like(req.body);
    await newLike.save();

    const activity = new Activity({
      user: userId,
      activityType: 'like',
      post: postId,
    });

    await activity.save();

    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

    res.status(200).json({ message: 'Post liked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
// todo : delete activity if user dislikes post
async function unlikePost(req, res) {
  const postId = req.body.post;
  const userId = req.body.user;
  try {
    const like = await Like.findOneAndDelete({ user: userId, post: postId });

    if (!like) return res.status(404).json({ message: 'Already unliked' });

    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });

    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
  likePost,
  unlikePost,
};
