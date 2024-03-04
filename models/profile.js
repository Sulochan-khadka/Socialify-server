const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    accountType: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    location: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    dob: {
      type: Date,
    },
    // closeFriends: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     select: false,
    // },
    coverPhoto: {
      type: String,
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
