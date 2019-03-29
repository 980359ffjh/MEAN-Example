const express = require('express');
const debug = require('debug')('app');
const env = process.env.NODE_ENV || 'development';
const app = express();

const config = require('./src/config/config')[env];

require('./src/config/express')(app, config);
require('./src/config/mongodb')(config);
require('./src/routes/appRoutes')(app);

app.listen(config.port, () => {
    debug('Listening on port', config.port + '...');
});