const { MongoClient } = require('mongodb');

// Connection URI
const uri =
  "mongodb://localhost:27017/?poolSize=10&writeConcern=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

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
