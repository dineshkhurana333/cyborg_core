const { MongoClient, Logger } = require('mongodb');

// Connection URI
const uri =
  "mongodb://localhot:27017";
// Create a new MongoClient
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  poolSize: 10,
  autoReconnect: true,
  numberOfRetries: 2,
  connectTimeoutMS: 100,
});

let db = null

async function connectDB() {
  try {
    const connection = await client.connect();
    db = connection.db('cyborg');
    console.log('Db connected');
  } catch (err) {
    console.log(`Error in db connectivity:: `, err);
    process.exit(1);
  };
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB }
