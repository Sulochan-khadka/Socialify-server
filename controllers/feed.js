const Follow = require("../models/follow");

async function getAllFeedPosts(req, res) {
    const userId = req.params.id;
    try {
        const followerFriends = await Follow.find({ follower: userId, accepted: true })
            .populate({
                path: 'followee',
                model: 'Profile',
                populate: {
                    path: 'posts',
                    model: 'Post'
                }
            });

        const followeeFriends = await Follow.find({ followee: userId, accepted: true })
            .populate({
                path: 'follower',
                model: 'Profile',
                populate: {
                    path: 'posts',
                    model: 'Post'
                }
            });

        const allPosts = followerFriends.map(item => item.followee.posts).flat()
            .concat(followeeFriends.map(item => item.follower.posts).flat());

        if (!allPosts || allPosts.length === 0) {
            return res.status(404).json({ 'message': 'No posts found' });
        }

        res.status(200).json(allPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}


async function getSuggestions(req, res) {
    try {
        

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function getStories(req, res) {
    try {

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getAllFeedPosts,
    getSuggestions,
    getStories
}