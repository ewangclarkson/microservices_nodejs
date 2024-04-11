const {Todo} = require('../model/Todo');


async function getTodos() {
    return Todo.find();
}

async function getTodo(id) {
    return Todo.findOne({_id: id});
}

async function updateTodo(id, todo) {
    return Todo.findByIdAndUpdate({_id: id}, {
        $set: {
            name: todo.name,
            expiryDate:todo.expiryDate,
            description:todo.description
        }
    }, {new: true});
}


async function createTodo(todo) {
    const todoRes = new Todo({
        name: todo.name,
        expiryDate: todo.expiryDate,
        description: todo.description
    });

    return todoRes.save();
}

async function deleteTodo(id) {
    return Todo.deleteOne({_id: id});
}

module.exports={
    getTodos,
    getTodo,
    updateTodo,
    createTodo,
    deleteTodo
}