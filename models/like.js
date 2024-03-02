const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    }
},
    {
        timestamps: true,
    }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;