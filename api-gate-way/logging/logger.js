const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'API Gate Way'},
    transports: [
        new winston.transports.File({
            filename: './logging/log.log', level: 'error'
        }),
    ],
    handleExceptions: true,
    handleRejections: true,
});

module.exports=logger;

