const Profile = require('../models/profile');

async function getOne(req, res) {
  const id = req.params.id;

  try {
    const user = await Profile.find({ user: id });

    if (!user || user.length == 0)
      return res.status(404).json({ message: 'User not found.' });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function updateOne(req, res) {
  const id = req.params.id;
  const update = req.body;

  try {
    const updatedUser = await Profile.findOneAndUpdate({ user: id }, update, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });
    res.status(202).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getOne,
  updateOne,
};
