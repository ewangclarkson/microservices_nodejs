const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {getUserByEmail} = require('./domain/services/UserServiceImpl');


async function hash(password) {
    const saltRounds = parseInt((config.get('bcrypt.salt')));
    console.log(saltRounds);
    return await bcrypt.hash(password, saltRounds);
}

async function authenticate(email, password) {
    const user = await getUserByEmail(email);
    if (!user) return false;


     console.log(user);
    const match = await bcrypt.compare(password, user.password);
    if (!match) return false;

    return true;
}

async function generateJWTToken(user) {
    const secret = config.get('jwt.secret');
    return jwt.sign(user, secret, {expiresIn: '24h'});
}

module.exports = {
    hash,
    authenticate,
    generateJWTToken
}