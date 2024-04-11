const jwt = require('jsonwebtoken');
const {httpStatus,errorMessages} = require('../http/exceptions');
const config = require('config');
module.exports=async function (req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(httpStatus.UNAUTHORIZED).send(errorMessages.UNAUTHORIZED);
    const secret = config.get('jwt.secret');
    const user = jwt.verify(token,secret);
    if (!user) return res.status(httpStatus.UNAUTHORIZED).send(errorMessages.UNAUTHORIZED);

    req.auth = user;
    next();
}