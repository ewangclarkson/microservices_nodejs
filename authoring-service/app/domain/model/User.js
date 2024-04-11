const mongoose = require('mongoose');
const Joi = require('joi');


const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        minlength: 7,
        maxlength: 100,
        unique:true,
        match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
}, {timestamps: true}));

function validateUser(loginDto) {
    const schema = Joi.object({
        name:Joi.string().min(2).max(255).required(),
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    return schema.validate(loginDto);
}

module.exports = {
    User,
    validateUser,
};