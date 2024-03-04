const Activity = require('../models/activity');
const Comment = require('../models/comment');
const Notification = require('../models/notification');
const Post = require('../models/post');
const Profile = require('../models/profile');

async function addComment(req, res) {
  const postId = req.body.post;
  // const userId = req.body.user;
  const userId = req.user;
  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Profile not found' });

    const comment = new Comment(req.body);
    comment.save();

    post.comments.push(comment._id);
    post.save();

    const activity = new Activity({
      user: userId,
      activityType: 'comment',
      content: req.body.text,
      post: postId,
    });

    await activity.save();

    const postUser = await Post.findById(postId, 'profile');
    const commentedByUserName = await Profile.findById(userId, 'name')

    const notification = new Notification({
      user: postUser.profile,
      type: "comment",
      content: `${commentedByUserName} commented on your post`
    })

    await notification.save();

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
  addComment,
};
