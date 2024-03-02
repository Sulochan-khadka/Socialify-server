const Follow = require("../models/follow");

async function getAllFollowersOfUser(req, res) {
    const userId = req.params.id;
    try {
        const friends = await Follow.find({ followee: userId, accepted: true })
            .populate({ path: 'follower', select: { 'name': 1, '_id': 1, 'avatar': 1 } })
            .exec();

        if (!friends || friends.length == 0)
            return res.status(404).json({ 'message': 'Friends not found' });

        res.status(200).json(friends);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function getAllRequestsReceived(req, res) {
    const userId = req.params.id;
    try {
        const requests = await Follow.find({ followee: userId, accepted: false })
            .populate({ path: 'follower', select: { 'name': 1, '_id': 1, 'avatar': 1 } })
            .exec();

        if (!requests || requests.length == 0)
            return res.status(404).json({ 'message': 'Requests not found' });

        res.status(200).json(requests);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

// !: ensure in frontend that duplicate requests are not sent
async function sendRequest(req, res) {
    const follower = req.body.follower;
    const followee = req.body.followee;
    try {
        const request = new Follow({ followee, follower })
        await request.save();

        if (!request)
            return res.status(404).json({ 'message': 'Requests not send' });

        res.status(201).json({ 'message': 'Request sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function acceptRequest(req, res) {
    const followId = req.params.id;
    try {
        const request = await Follow.findByIdAndUpdate(followId,{ accepted: true }, { new: true });
            
        if (!request)
            return res.status(404).json({ 'message': 'Requests not accepted' });

        res.status(202).json({ 'message': 'Request accepted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}


module.exports = {
    getAllFollowersOfUser,
    getAllRequestsReceived,
    sendRequest,
    acceptRequest
}