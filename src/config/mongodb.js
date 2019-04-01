const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:mongodb');

module.exports = function monogdb(config) {
    // MongoDB 全域(只連線一次，查詢一次)
    MongoClient.connect(config.url, { useNewUrlParser: true }, (err, client) => {
        try {
            debug('Connected to MongoDB server');

            const db = client.db(config.dbName);
            const col = db.collection(config.collection);

            col.findOne((err, result) => {
                message = result.message;
            });

            client.close();
        } catch (error) {
            debug('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
    });
}