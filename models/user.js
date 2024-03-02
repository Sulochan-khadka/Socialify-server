const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Profile = require('./profile');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        validate: validator.isEmail,
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim : true,
        unique : [true, 'Username already exists'],
    },
},
    { timestamps: true }
);

// Hash password
userSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (dbPassword, userPassword) {
    return await bcrypt.compare(dbPassword, userPassword);
};

// Create a profile after user creation
userSchema.post('save', async function (doc) {
    await Profile.create({ user: doc._id });
});

const User = mongoose.model('User', userSchema);

module.exports = User;