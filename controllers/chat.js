const Chat = require("../models/chat");
const Profile = require("../models/profile");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = async (req, res) => {
    const userId  = req.body.user;
    const receiverId = req.body.receiver;

    if (!userId)
        return res.status(400).json({'Message' : 'User id required'});

    var isChat = await Chat.find({
        groupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } },
            { users: { $elemMatch: { $eq: receiverId } } },
        ],
    })
        .populate("users", "name avatar")
        .populate("latestMessage");

    isChat = await Profile.populate(isChat, {
        path: "latestMessage.sender",
        select: "name avatar username",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "personal",
            groupChat: false,
            users: [receiverId, userId],
            createdBy : userId,
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await createdChat.populate("users","name avatar");
            res.status(200).json(FullChat);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
};

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = async (req, res) => {
    const userId = req.body.user;
    try {
        const chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
            .populate({
                path: "users",
                select: "name avatar"
            })
            .populate({
                path: "createdBy",
                select: "name avatar"
            })
            .populate({
                path: "latestMessage.sender",
                select: "name avatar"
            })
            .sort({ updatedAt: -1 });

        res.status(200).send(chats);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};


//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = async (req, res) => {
    const adminId = req.body.admin; 
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    var users = req.body.users;

    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    users.push(adminId);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            groupChat: true,
            createdBy: adminId,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "name avatar")
            .populate("createdBy", "name avatar");

        res.status(200).json(fullGroupChat);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404);
        // throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
};

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        // throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
};

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        // throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
};

module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
};