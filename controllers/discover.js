const Profile = require("../models/profile");

async function discoverPublicUserAndPosts(req, res) {
    try {
        const usersAndPosts = await Profile.find({ accountType: "public" }, "avatar name")
            .populate('posts', 'images')

        if (!usersAndPosts || usersAndPosts.length == 0)
            return res.status(404).json({ 'message': 'Users and posts not found' });

        res.status(200).json(usersAndPosts);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function searchUsers(req, res) {
    const search = req.query.search || "";
    try {
        const users = await Profile.find({name : {$regex : search, $options : 'i'}}, "name avatar")

        if (!users || users.length == 0)
            return res.status(404).json({ 'message': 'Users and posts not found' });

        res.status(200).json(users);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = {
    discoverPublicUserAndPosts,
    searchUsers
}