const Chat = require("../models/chat");
const Message = require("../models/message");
const Profile = require("../models/profile");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = async (req, res) => {
    const chatId = req.params.id;
    try {
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "name avatar")
            .populate("chat");
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = async (req, res) => {
    const { sender, content, chatId } = req.body;

    var newMessage = {
        sender: sender,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name avatar");
        message = await message.populate("chat");

        message.chat = await Profile.populate(message.chat, {
            path: "users",
            select: "name avatar",
        });

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        res.json(message);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};


module.exports = { allMessages, sendMessage };
