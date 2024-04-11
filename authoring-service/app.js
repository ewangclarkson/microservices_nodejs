require('express-async-errors');
const express = require('express');
const app = express();
require('./app/domain/config/database');
const logger = require('./logging/logger');
require('./logging/config')(logger);
const broker= require('./app/broadcast/message.broker');

//subscript to events
broker.subScribeToEvent({item: "test"}, broker.channel)
    .then(() => console.log('done'))
    .catch(() => console.error('error'));

require('./routes/boot')(app);


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`The application is listening on port ${port}`));