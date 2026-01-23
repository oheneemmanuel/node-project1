const mongoClient = require('mongodb').MongoClient;

let dbConnection;

const initDb = (callback) => {
  if (dbConnection) {
    console.log('Database is already initialized!');
    return callback(null, dbConnection);
  }
  mongoClient
    .connect(process.env.MONGO_DB_URL)
    .then((client) => {
      dbConnection = client.db();
      console.log('Database initialized successfully');
      return callback(null, dbConnection);
    })
    .catch((err) => {
      console.error('Database initialization failed');
      return callback(err);
    });
};

const getDatabase = () => {
  if (!dbConnection) {
    throw new Error('Database not initialized');
  }
  return dbConnection;
};

module.exports = {
  initDb,
  getDatabase
};
