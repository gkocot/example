const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(80, () => {
    debug('Listening on port 80.');
})