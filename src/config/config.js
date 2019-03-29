const path = require('path');
const rootPath = path.join(__dirname + '/../../');

module.exports = {
    development: {
        url: 'mongodb://localhost:27017',
        dbName: 'NodeJS',
        rootPath: rootPath,
        port: process.env.PORT || 3000
    },
    production: {
        url: 'mongodb+srv://MEAN:%24h1neW%40ve@mean-bizku.mongodb.net/test?retryWrites=true',
        dbName: 'NodeJS',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}