const mongoose = require('mongoose');
const { Schema } = mongoose;

const storySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    image : {
        type : String,
    },
    video : {
        type : String,
    },
    audio : {
        type : String,
    }
},
    {timestamps : true}
);

const Story = mongoose.model('Story', storySchema);

module.exports = Story;