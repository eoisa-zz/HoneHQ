'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const smoochCore = require('smooch-core');

const PORT = 8000;

const app = express();
app.use(bodyParser.json());

app.post('/message', function (req, res) {
    const appUserId = req.body.appUser._id;
    if (req.body.trigger === 'conversation:start') {
        process(appUserId, res)
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

function process(userId, res) {
    const KEY_ID = 'app_5a47ae74be7349003f14b076';
    const KEY_SECRET = '5zTIoGp1TQWcNiN6wgDNb0H1';

    const smooch = new smoochCore({
        keyId: KEY_ID,
        secret: KEY_SECRET,
        scope: 'app'
    });

    smooch.appUsers.sendMessage(userId, {
        type: 'text',
        text: 'Hello! I\'m HoneBot! Say \'start\' to get going!',
        role: 'appMaker'
    }).then((response) => {
        console.log('API Response: ', response);
        res.end();
    }).catch((err) => {
        console.log('API Error: ', err);
        res.end();
    });
}