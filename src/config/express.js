const express = require('express');
const morgan = require('morgan');
const path = require('path');
const stylus = require('stylus');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const debug = require('debug')('app:express');

module.exports = function expressConfig(app, config) {
    debug('config :', config);
    app.set('views', path.join(config.rootPath, 'src/views'));
    app.set('view engine', 'jade');
    app.use(morgan('tiny'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({ secret: 'mean app' }));
    app.use(stylus.middleware({
        src: path.join(config.rootPath, '/public'),
        compile: compile
    }));
    app.use(express.static(path.join(config.rootPath, '/public')));

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }
}