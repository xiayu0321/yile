var mongoose = require('mongoose');

module.exports = {
    connect: function (mode, callback) {
        let url = 'mongodb://localhost/freetravel-db';
        mongoose.connect(url, callback);
    },
    close: function (callback) {
        mongoose.connection.close(callback);
    }
};
