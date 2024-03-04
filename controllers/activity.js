const Activity = require("../models/activity");

async function getAllActivitiesOfUser(req, res) {
    // const userId = req.body.user;
    const userId = req.user;
    try {
        const activities = await Activity.find({ user: userId })

        if (!activities || activities.length == 0)
            return res.status(404).json({ 'message': 'No activity found' });

        res.status(200).json(activities);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getAllActivitiesOfUser
}