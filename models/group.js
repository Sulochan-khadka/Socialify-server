const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    groupType: {
        type: String,
        required: [true, 'Group type is required'],
        enum: ['private', 'public'],
    },
    name: {
        type: String,
        required: [true, 'Group name is reqired'],
    },
    description: {
        type: String,
    }
});

// GroupSchema.pre(/^find/, function (next) {
//     this.find().populate({
//         path: 'users',
//         select: 'username user name photo _id',
//     });
//     next();
// });

const Group = mongoose.model('Group', groupSchema);