const User = require("../models/user");

async function getAll(req, res) {
    try {
        const user = await User.find();

        if (!user || user.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function getOne(req, res) {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if (!user)
            return res.status(404).json({ message: "User not found." });

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
async function createOne(req, res) {
    try {

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: `New user : ${newUser.username} created` });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = {};
            for (let field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            return res.status(400).json({ errors });
        } else if (err.code === 11000 && err.keyPattern.email) {
            return res.status(409).json({ message: 'Email taken' });
        } else if (err.code === 11000 && err.keyPattern.username) {
            return res.status(409).json({ message: 'Username taken' });
        } else {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
async function updateOne(req, res) {
    const id = req.params.id;
    const update = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
        if (!updatedUser)
            return res.status(404).json({ 'message': 'User not found' });
        res.status(202).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
// TODO : delete profile, follows, likes, comments corresponding to a user
async function deleteOne(req, res) {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}