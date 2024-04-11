const Joi = require('joi');
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    projectId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false
    }

}, {timestamps: true}));


function validateTodo(loginDto) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(5).required(),
        expiryDate: Joi.date().required()
    });

    return schema.validate(loginDto);
}

module.exports = {
    Todo,
    validateTodo
}