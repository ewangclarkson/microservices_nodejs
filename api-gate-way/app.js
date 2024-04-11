require('express-async-errors');
const express = require('express');
const app = express();
const logger = require('./logging/logger');
require('./logging/config')(logger);
require('./routes/boot')(app);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The application is listening on port ${port}`));