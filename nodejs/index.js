'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const smoochCore = require('smooch-core');

const PORT = 8000;
const KEY_ID = 'app_5a47ae74be7349003f14b076';
const KEY_SECRET = '5zTIoGp1TQWcNiN6wgDNb0H1';

const smooch = new smoochCore({
    keyId: KEY_ID,
    secret: KEY_SECRET,
    scope: 'app'
});

const app = express();
app.use(bodyParser.json());

app.post('/message', function (req, res) {
    console.log('My webhook: ', JSON.stringify(req.body, null, 4));

    const appUserId = req.body.appUser._id;
    console.log('app user id: ', appUserId);

    if(req.body.trigger === 'message:appUser'){
        smooch.appUsers.sendMessage(appUserId, {
            type: 'text',
            text: 'Hello, Hone',
            role: 'appMaker'
        }).then((response) => {
            console.log('API Response: ', response);
            res.end();
        }).catch((err) =>{
            console.log('API Error: ', err);
            res.end();
        });
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});