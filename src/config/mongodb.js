const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app');

module.exports = function monogdb(config) {
    // MongoDB 全域(只連線一次，查詢一次)
    MongoClient.connect(config.url, (err, client) => {
        try {
            debug('Connected to MongoDB server');

            const db = client.db(config.dbName);
            const col = db.collection('Messages');

            col.findOne((err, result) => {
                message = result.message;
            });
        } catch (error) {
            debug(error.stack);
        }

        client.close();
    });
}