const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required : true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required : true,
    },
    content: {
        type: String,
        required: [true, 'Message should not be empty'],
    },
    seen: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
        },
    ],
},
    {timestamps : true},
)

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;