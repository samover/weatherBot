/**
 * facebook.config.js
 * src/config
 *
 * Created by samover on 15/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

function getFbPageToken() {
    const token = process.env.FB_PAGE_TOKEN;
    if (!token) throw new Error('Missing FB page token');
    return token;
}

function getFbVerifyToken() {
    const token = process.env.FB_VERIFY_TOKEN;
    if (!token) throw new Error('Missing FB verification token');
    return token;
}

module.exports = exports = {
    graphUri: 'https://graph.facebook.com/v2.6/me/messages',
    pageToken: getFbPageToken(),
    verifyToken: getFbVerifyToken(),
}
