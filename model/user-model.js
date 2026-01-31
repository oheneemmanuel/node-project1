const mongodb = require('../data/database');

const getUsersCollection = () => {
    const db = mongodb.getDatabase();

    return db.collection('user');
};

module.exports = { getUsersCollection };
