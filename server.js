const express = require('express');
const stylus = require('stylus');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const app = express();

// MongoDB 全域
// let url;
// if (env === 'development')
//     url = 'mongodb://localhost:27017';
// else
//     // mLab 的 Connection String，User pwd 有特殊符號，要經過 Hex 轉換(https://ascii.cl/)
//     url = 'mongodb+srv://MEAN:%24h1neW%40ve@mean-bizku.mongodb.net/test?retryWrites=true';
// const dbName = 'NodeJS';

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

// MongoDB 全域 (只連線一次，查詢一次)
// MongoClient.connect(url, (err, client) => {
//     try {
//         debug('Connected to MongoDB server');

//         const db = client.db(dbName);
//         const col = db.collection('Messages');

//         col.findOne((err, result) => {
//             message = result.message;
//         });
//     } catch (error) {
//         debug(error.stack);
//     }

//     client.close();
// });

app.get('/clientApp/:clientAppPath', (req, res) => {
    res.render('clientApp/' + req.params.clientAppPath);
});

app.get('*', (req, res) => {
    // MongoDB 區域 (每次進入，就每次連線及查詢)
    let url;
    if (env === 'development')
        url = 'mongodb://localhost:27017';
    else
        // mLab 的 Connection String，User pwd 有特殊符號，要經過 Hex 轉換(https://ascii.cl/)
        url = 'mongodb+srv://MEAN:%24h1neW%40ve@mean-bizku.mongodb.net/test?retryWrites=true';
    const dbName = 'NodeJS';

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            debug('Connected to MongoDB server');

            const db = client.db(dbName);
            const col = await db.collection('Messages');
            const result = await col.findOne({}, { projection: { _id: 0, message: 1 } });

            res.render(
                './home/index',
                {
                    Message: result.message
                }
            );
        } catch (error) {
            debug(error.stack);
        }

        client.close();
    }());

    // MongoDB 全域
    // res.render(
    //     './home/index',
    //     {
    //         Message: message
    //     }
    // );
});

app.listen(port, () => {
    debug('Listening on port', port + '...');
});

function compile(str, path) {
    return stylus(str).set('filename', path);
}