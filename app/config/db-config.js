const { MongoClient } = require('mongodb');

// Connection URI
const uri =
  "mongodb://localhost:27017/?poolSize=5&writeConcern=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect().then((connection) => {
  let db = connection.db('cyborg');
  console.log('Db connected');
  module.exports = { db };
}).catch((err) => {
  console.log(`Error in db connectivity:: `, err)
});
