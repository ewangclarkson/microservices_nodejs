const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'authoring_service'},
    transports: [
        new winston.transports.File({
            filename: './logging/log.log', level: 'error'
        }),
    ],
    handleExceptions: true,
    handleRejections: true,
});

module.exports=logger;

