const {httpStatus, errorMessages} = require('../http/exceptions');
const {getTodo,getTodos,createTodo,updateTodo,deleteTodo} = require('../domain/services/TodoServiceImpl');
const {validateTodo} = require('../domain/model/Todo');
const {createChannel,publishEvent} = require('../broadcast/message.broker');

async function createATodo(req, res) {
    const {error} = validateTodo(req.body);
    if (error) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    const todo = await createTodo(req.body);
    return res.status(httpStatus.SUCCESS).send(todo);
}

async function updateATodo(req, res) {
    const {error} = validateTodo(req.body);
    if (error || !req.params.id) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    const todo = await updateTodo(req.params.id, req.body);
    return res.status(httpStatus.SUCCESS).send(todo);
}

async function getATodo(req, res) {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    const todo = await getTodo(req.params.id);
    const payload = {
        event:"ADD_TODO",
        data:todo,
    }
    const channel = await createChannel();
    await publishEvent(channel,payload);

    return res.status(httpStatus.SUCCESS).send(todo);
}

async function getTodoList(req, res) {
    const todoList = await getTodos();
    return res.status(httpStatus.SUCCESS).send(todoList);
}

async function deleteATodo(req, res) {
    const todo = await getTodo(req.params.id);

    if (!req.params.id || !todo) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    await deleteTodo(req.params.id);
    return res.status(httpStatus.SUCCESS).send("The todo was successfully deleted");
}

module.exports = {
    getATodo,
    getTodoList,
    updateATodo,
    deleteATodo,
    createATodo
}