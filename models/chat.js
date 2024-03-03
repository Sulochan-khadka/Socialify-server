const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required : true,
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required : true,
    },
    chatName: {
        type: String,
        required: [true, 'Chat name is reqired'],
    },
    description: {
        type: String,
    },
    groupChat : {
        type : Boolean,
        default : true
    },
    latestMessage : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }
},
    {timestamps: true}
);

// GroupSchema.pre(/^find/, function (next) {
//     this.find().populate({
//         path: 'users',
//         select: 'username user name photo _id',
//     });
//     next();
// });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;