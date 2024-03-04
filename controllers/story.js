const Follow = require("../models/follow");
const Story = require("../models/story");

async function getStoriesOfFriends(req, res) {
    const userId = req.user;
    try {
        const friends = await Follow.find({
            $or: [
                { follower: userId, accepted: true },
                { followee: userId, accepted: true }
            ]
        });

        const friendIds = friends.map(friend => {
            return friend.follower.equals(userId) ? friend.followee : friend.follower;
        });

        const stories = await Story.find({ _id: { $in: friendIds } });

        if (!stories || stories.length == 0)
            return res.status(404).json({ 'message': 'Stories not found' });

        res.status(200).json(stories);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function postStory(req, res) {
    const userId = req.user;
    const {image, video, audio} = req.body;
    try {
        const newStory = await Story.create({
            user : userId,
            image,
            video,
            audio
        })
        if (!newStory)
            return res.status(404).json({ 'message': 'Could not create story' });

        res.status(200).json(newStory);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports ={
    getStoriesOfFriends,
    postStory
}

