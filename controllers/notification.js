const Notification = require("../models/notification");

async function getNotificationsOfUser(req, res) {
    const userId = req.user;
    try {
        const notifications = await Notification.find({user : userId }).sort({createdAt : -1});

        if (!notifications || notifications.length == 0)
            return res.status(404).json({ 'message': 'Notifications not found' });

        res.status(200).json(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getNotificationsOfUser
}