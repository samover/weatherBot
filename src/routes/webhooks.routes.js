/**
 * webhooks.routes.js
 * src/routes
 *
 * Created by samover on 15/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const router = require('express').Router();
const fbConnector = require('../connectors/facebook.connector');
const fbConfig = require('../config/facebook.config');
const bot = require('../bot');
const BOT_ID = '1985381111706287';

function handleValidMessage(entry) {
    if (entry.message.attachments) return fbConnector.newMessage(entry.sender.id, 'We don\'t accept attachments at the moment');
    if (entry.sender.id === BOT_ID) return Promise.resolve();
    return bot.read(entry.sender.id, entry.message.text);
}

router.get('/', (req, res, next) => {
    if (req.query['hub.verify_token'] === fbConfig.verifyToken) {
        return res.send(req.query['hub.challenge']);
    }
    return res.send('Error. Wrong token');
});

router.post('/', (req, res, next) => {
    const entry = fbConnector.getMessageEntry(req.body);

    if (entry && entry.message) handleValidMessage(entry);
    res.sendStatus(200);
});

module.exports = exports = router;
