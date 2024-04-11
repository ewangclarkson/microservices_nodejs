const Joi = require('joi');
const _ = require('lodash');
const {authenticate, generateJWTToken, hash} = require('../../Utils');
const {httpStatus, errorMessages} = require('../../http/exceptions');
const {getUserByEmail, createUser} = require('../../domain/services/UserServiceImpl');
const {validateUser} = require('../../domain/model/User');


async function login(req, res) {

    const {error} = validate(req.body);
    if (error) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);

    if (!await authenticate(req.body.email, req.body.password)) return res.status(httpStatus.UNAUTHORIZED).send(errorMessages.UNAUTHORIZED);

    const auth = _.pick(await getUserByEmail(req.body.email),['_id','name','email','createdAt','updatedAt']);
    const token = await generateJWTToken(auth);

    return res.header('x-auth-token',token).status(httpStatus.SUCCESS).send(auth);
}

async function registerUser(req, res) {

    const {error} = validateUser(req.body);
    if (error) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);

    const user = await createUser(req.body.name, req.body.email, await hash(req.body.password));


    return res.status(httpStatus.CREATED).send(user);
}

async function getAuth(req,res) {
    const auth = req.auth;
    if(!auth) return  res.status(httpStatus.UNAUTHORIZED).send(errorMessages.UNAUTHORIZED);

    return res.status(httpStatus.SUCCESS).send(auth);
}

function validate(loginDto) {
    const schema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    return schema.validate(loginDto);
}


module.exports = {
    login,
    registerUser,
    getAuth,
}