const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ email }).select('+password').exec();

    if (!foundUser) {
        return res.status(401).json({ message: 'User not found' })
    }

    const foundProfile = await Profile.findOne({user : foundUser._id})

    if (!foundProfile) {
        return res.status(401).json({ message: 'Profile not found' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Wrong password' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "id": foundProfile._id,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    res.json({ accessToken })
}


// const logout = (req, res) => {
//     const cookies = req.cookies
//     if (!cookies?.jwt) return res.sendStatus(204) 
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
//     res.json({ message: 'Cookie cleared' })
// }

module.exports = {
    login,
    // logout
}