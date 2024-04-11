const logger = require('../../logging/logger');
const {httpStatus, errorMessages} = require('../http/exceptions');

module.exports = function (error, req, res, next) {
    if (error) {
        logger.error(error.message);
        return res.status(httpStatus.INTERNAL_API_ERROR).send(errorMessages.INTERNAL_API_ERROR);
    }
}