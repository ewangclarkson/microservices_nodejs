const {httpStatus, errorMessages} = require('../http/exceptions');
const {updateUser, getUser, getUsers, deleteUser} = require('../domain/services/UserServiceImpl');
const {validateUser} = require('../domain/model/User');
const {createChannel,publishEvent} = require('../broadcast/message.broker');



async function updateAUser(req, res) {
    const {error} = validateUser(req.body);
    if (error || !req.params.id) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    const user = await updateUser(req.params.id, req.body.name);
    return res.status(httpStatus.SUCCESS).send(user);
}

async function getAUser(req, res) {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    const user = await getUser(req.params.id);
    const payload = {
        event:"ADD_TODO",
        data:user,
    }
    const channel= await createChannel();
    await publishEvent(channel,payload);
    return res.status(httpStatus.SUCCESS).send(user);
}

async function getUserList(req, res) {
    const users = await getUsers();
    return res.status(httpStatus.SUCCESS).send(users);
}

async function deleteAUser(req, res) {
    const user = await getUser(req.params.id);

    if (!req.params.id || !user) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    await deleteUser(req.params.id);
    return res.status(httpStatus.SUCCESS).send('The user was successfully deleted');
}

module.exports = {
    getAUser,
    getUserList,
    updateAUser,
    deleteAUser
}