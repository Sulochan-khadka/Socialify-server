const Post = require("../models/post");
const Profile = require("../models/profile");

async function getAllPostsOfAProfile(req, res) {
    const profileId = req.params.id;

    try {
        const posts = await Post.find({ profile: profileId });

        if (!posts || posts.length == 0)
            return res.status(404).json({ 'message': 'Posts not found' });

        res.status(200).json(posts);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function getOne(req, res) {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);

        if (!post || post.length == 0)
            return res.status(404).json({ 'message': 'Posts not found' });

        res.status(200).json(post);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
async function createOne(req, res) {
    const profileId = req.body.profile;
    const content = req.body;
    try {
        const profile = await Profile.findById(profileId);

        if (!profile)
            return res.status(404).json({ 'message': 'Profile not found' });

        const newPost = new Post({
            ...content,
            profile: profileId
        });

        await newPost.save();

        profile.posts.push(newPost._id);
        await profile.save();

        res.status(201).json({ 'message': `New post created` });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function deleteOne(req, res) {
    const postId = req.params.id;
    try {
        
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await Profile.updateOne({ _id: post.profile }, { $pull: { posts: postId } });

        await Post.findByIdAndDelete(postId);
        
        res.status(200).json({ message: 'Deleted Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}


module.exports = {
    getAllPostsOfAProfile,
    getOne,
    createOne,
    deleteOne
}