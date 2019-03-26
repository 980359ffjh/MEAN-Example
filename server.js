const express = require('express');
const stylus = require('stylus');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const app = express();

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'mean app' }));
app.use(stylus.middleware({
    src: path.join(__dirname, '/public'),
    compile: compile
}));
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('Listening on port', port + '...');
});

function compile(str, path) {
    return stylus(str).set('filename', path);
}