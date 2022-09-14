const User = require ('../models/user');


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


const getUsers = async() => {
    const users = await User
    .find()
    .sort('-online');
    return users;
}

module.exports = {
    connectUser,
    disconnectUser,
    getUsers
}