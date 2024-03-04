const mongoose = require('mongoose')
const {Schema} = mongoose;

const notificationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    type :{
        type : String,
        enum : ['like', 'comment', 'request'],
        required : true,
    },
    content : {
        type : String,
    },
    requestId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Follow',
    }
},
    {timestamps : true}
)

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;