const express = require('express');
const path = require('path');

// const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const app = express();

// app.configure(function () {
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');
// });

app.get('*', function (req, res) {
    res.render('index');
});

app.listen(port);
console.log('Listening on port', port + '...');