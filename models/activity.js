const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    activityType: {
        type: String,
        enum: ['like', 'comment'],
        required: true
    },
    content : {
        type : String,
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
},
    { timestamps: true }
);

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;