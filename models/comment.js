const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    text: {
        type: String,
        trim: true,
        required: [true, 'Comment should not be empty'],
    }
},
    {
        timestamps: true,
        unique: true,
    }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;