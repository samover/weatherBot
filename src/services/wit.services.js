/**
 * wit.services.js
 * src/services
 *
 * Created by samover on 15/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const nodeWit = require('node-wit');
const Wit = nodeWit.Wit;
const interactive = nodeWit.interactive;
const witConfig = require('../config/wit.config');
const connector = require('../connectors/facebook.connector');

function firstEntityValue(entities, entity) {
    const val = entities &&
        entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;

    if (!val) return null;
    return typeof val === 'object' ? val.value : val;
}

const actions = {
    send: (request, response) => {
        const { sessionId, context, entities } = request;
        const { text, quickreplies } = response;
        return connector.newMessage(context._fbid_, response)
            .then(() => Promise.resolve())
            .catch((err) => {
                console.error(err);
                return Promise.resolve();
            });
    },
    getForecast: ({ context, entities }) => {
        return new Promise((resolve, reject) => {
            const location = firstEntityValue(entities, 'location');
            if (location) {
                context.forecast = 'sunny in ' + location;
                delete context.missingLocation;
            } else {
                context.missingLocation = true;
                delete context.forecast;
            }

            return resolve(context);
        })
    },
};

const client = new nodeWit.Wit({ accessToken: witConfig.accessToken, actions });

// BOT TESTING MODE
if (require.main === module) {
    console.log('Bot testing mode!')
    interactive(client);
}

module.exports = exports = client;
