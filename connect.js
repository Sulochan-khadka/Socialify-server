const mongoose = require('mongoose');

const connectMongoDB = async (uri) => {
    try{
        await mongoose.connect(uri);
        console.log("MongoDB connected 😊");
    }catch(err){
        console.error(`Error connecting to mongoDB : ${err}`);
    }
}

module.exports = {
    connectMongoDB,
};