'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8000;

const app = express();
app.use(bodyParser.json());

app.post('/message', function (req, res) {
    console.log('My webhook: ', JSON.stringify(req.body, null, 4))
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});