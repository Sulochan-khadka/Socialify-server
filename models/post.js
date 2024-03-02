const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    caption: {
        type: String,
        trim: true,
        required : true,
    },
    location: {
        type: String,
    },
    audio : {
        type : String,
    },
    images: [{
        type : String,
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    likeCount : {
        type : Number,
        default : 0
    }
},

    {timestamps : true}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;