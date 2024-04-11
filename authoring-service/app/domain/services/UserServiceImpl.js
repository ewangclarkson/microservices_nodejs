const {User} = require('../model/User');
const _ = require('lodash');


async function getUsers() {
    const users = await User.find();

    const list = users.map((user) => {
        return _.pick(user,['_id','name','email','createdAt','updatedAt'])
    })
    return list;
}

async function getUser(id) {
    const user = await User.findOne({_id: id});


    return _.pick(user,['_id','name','email','createdAt','updatedAt']);
}

async function updateUser(id, name) {

    const user = await User.findByIdAndUpdate({_id: id}, {
        $set: {
            name: name
        }
    }, {new: true});

    return _.pick(user,['_id','name','email','createdAt','updatedAt']);
}


async function createUser(name, email, password) {
    const user = new User({
        name: name,
        email: email,
        password: password
    });

    const cUser = await user.save();
    return _.pick(cUser,['_id','name','email','createdAt','updatedAt']);
}

async function deleteUser(id) {
    return User.deleteOne({_id: id});
}

async function getUserByEmail(email) {

    const user = await User.findOne({email: email});

    return _.pick(user,['_id','name','email','password','createdAt','updatedAt']);
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser,
    getUserByEmail
};