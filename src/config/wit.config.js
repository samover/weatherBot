/**
 * wit.js
 * src/config
 *
 * Created by samover on 15/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

function getAccessToken() {
    const accessToken = process.env.WIT_SERVER_TOKEN;
    if (!accessToken) throw new Error('Missing wit accessToken');
    return accessToken;
}

module.exports = exports = {
    accessToken: getAccessToken(),
};
