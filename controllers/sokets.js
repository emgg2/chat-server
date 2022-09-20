const User = require ('../models/user');
const Message = require ('../models/message');


const connectUser = async( uid ) => {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();

    return user;
}

const disconnectUser = async( uid ) => {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();
    return user; 
}

const saveMessage = async( payload ) => {
    try {
        const message = new Message(payload);
        await message.save();
        return message;
        
    } catch (error) {
        console.log(error);
        return false;
    }   
}


const getUsers = async() => {
    const users = await User
    .find()
    .sort('-online');
    return users;
}

module.exports = {
    connectUser,
    disconnectUser,
    getUsers,
    saveMessage
}