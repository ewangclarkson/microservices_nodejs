const express = require('express');
const helmet = require('helmet');
const proxy = require('express-http-proxy');
const config = require('config');
const compression = require("compression");
const cors = require("cors");
const error = require('../app/middleware/error');

/**
 *  Service DNS
 */
const authoringService = config.get('services.authoring.host') + ':' + config.get('services.authoring.port');
const projectService = config.get('services.project.host') + ':' + config.get('services.project.port');
const todoService = config.get('services.todo.host') + ':' + config.get('services.todo.port');

/**
 * Rerouting to the right services
 */

console.log(authoringService);

module.exports = function (app) {
    app.use(express.json());
    app.use(express.static("public"));
    app.use(helmet());
    app.use(compression());
    app.use(cors({
        origin: 'http://localhost:8000',
        optionsSuccessStatus: 200,
    }));

    app.use('/api/projects', proxy(projectService));
    app.use('/api/todos', proxy(todoService));
    app.use('/api', proxy(authoringService));
    app.use(error);
};