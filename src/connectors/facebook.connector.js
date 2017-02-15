/**
 * facebook.connector.js
 * src/connectors
 *
 * Created by samover on 15/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const request = require('request')
const config = require('../config/facebook.config.js')

const newRequest = request.defaults({
    uri: config.graphUri,
    method: 'POST',
    json: true,
    qs: {
        access_token: config.pageToken,
    },
    headers: {
        'Content-Type': 'application/json'
    },
})

// SETUP A MESSAGE FOR THE FACEBOOK REQUEST
const newMessage = function (recipientId, message) {
    const options = {
        body: {
            recipient: {
                id: recipientId
            },
            message,
        },
    }

    return new Promise((resolve, reject) => {
        newRequest(options, function (err, response, body) {
            if (err) return reject(err);
            if (body.error && body.error.message) throw new Error(body.error.message);
            return resolve(body);
        });
    });
}

const getMessageEntry = function (body) {
    const val = body.object === 'page' &&
        body.entry &&
        Array.isArray(body.entry) &&
        body.entry.length > 0 &&
        body.entry[0] &&
        body.entry[0].messaging &&
        Array.isArray(body.entry[0].messaging) &&
        body.entry[0].messaging.length > 0 &&
        body.entry[0].messaging[0]
    return val || null
}

module.exports = {
    newRequest,
    newMessage,
    getMessageEntry,
};
