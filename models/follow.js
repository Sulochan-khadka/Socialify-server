const mongoose = require('mongoose');
const { Schema } = mongoose;

const followSchema = new Schema({
    follower : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required : true,
    },
    followee :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required : true,
    },
    accepted : {
        type : Boolean,
        default : false,
    }
    // TODO:  time
},
    {
        timestamps : true,
        unique : true,

        // ! : followSchema.index({ follower: 1, followee: 1 }, { unique: true });
    }

);

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;