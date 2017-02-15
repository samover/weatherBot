/**
 * index.js
 * src/bot
 *
 * Created by samover on 15/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict'

const wit = require('../services/wit.services');
const connector = require('../connectors/facebook.connector');

// LETS SAVE USER SESSIONS
const sessions = {}

function findOrCreateSession(fbid) {
    let sessionId;

    // Check if user already has a session
    Object.keys(sessions).forEach(k => {
        if (sessions[k].fbid === fbid) sessionId = k
    });

    // No session so we will create one
    if (!sessionId) {
        sessionId = new Date().toISOString()
        sessions[sessionId] = { fbid, context: { _fbid_: fbid } };
    }

    return sessionId
}

function read(sender, message) {
    const sessionId = findOrCreateSession(sender)

    return wit.runActions(sessionId, message, sessions[sessionId].context)
        .then((context) => {
            console.info('Waiting for further messages')
            sessions[sessionId].context = context
        })
        .catch((error) => {
            console.trace(error);
            console.error('oops!', error.stack || error)
        });
}

module.exports = {
    findOrCreateSession,
    read,
};
