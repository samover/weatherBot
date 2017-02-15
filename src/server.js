/**
 * server.js
 * src
 *
 * Created by samover on 15/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const express = require('express');

/*
 * MODULE CONFIGURATION
 */
require('./config/environment.config');
const bodyParser = require('./middlewares/bodyParser.middlewares');
const helmet = require('./middlewares/helmet.middlewares');
const logger = require('./middlewares/logger.middlewares');
const errorHandler = require('./middlewares/errorHandler.middlewares');

/*
 * CONSTANT DECLARATION
 */
const port = process.env.PORT || 3000;

/*
 * APP INITIALIAZATION
 */
const app = express();

app.use(helmet);
app.use(bodyParser);

if (process.env.NODE_ENV !== 'test') app.use(logger);

/*
 * ROUTE DECLARATIONS
 */

const webhooksRouter = require('./routes/webhooks.routes.js');

app.get('/', (req, res, next) => {
    res.send('Hello, World! I am a chat bot');
})

app.use('/webhooks', webhooksRouter);

// Catch all unknown routes.
app.all('*', (req, res, next) => res.sendStatus(404));

app.use(errorHandler);

/*
 * START SERVER
 */

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});

module.exports = exports = app;
