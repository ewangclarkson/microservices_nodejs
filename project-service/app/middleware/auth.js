const jwt = require('jsonwebtoken');
const {httpStatus,errorMessages} = require('../http/exceptions');
const config = require('config');

module.exports=function (req,res,next) {
    const token = req.header('x-auth-token');
    console.log(token);
    if(!token) return res.status(httpStatus.UNAUTHORIZED).send(errorMessages.UNAUTHORIZED);
    const secret = config.get('jwt.secret');
    console.log(secret);
    const user = jwt.verify(token,secret);
    if (!user) return res.status(httpStatus.UNAUTHORIZED).send(errorMessages.UNAUTHORIZED);

    req.auth = user;
    next();
}