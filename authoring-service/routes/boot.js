const express = require('express');
const helmet = require('helmet');
const compression = require("compression");
const cors = require("cors");
const apiRoutes = require('./api');
const webRoutes = require('./web');
const error = require('../app/middleware/error');


module.exports = async function (app) {
    app.use(express.json());
    app.use(express.static("public"));
    app.use(helmet());
    app.use(compression());
    app.use(cors({
        origin: 'http://localhost:3000',
        exposedHeaders: 'x-auth-token',
        optionsSuccessStatus: 200,
    }));
    app.set("view", "./resources/views");
    app.set("view engine", "ejs");
    app.use(apiRoutes);
    //app.use("/", webRoutes);
    app.use(error);
};