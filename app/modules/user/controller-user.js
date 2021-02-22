const { getDB, connectDB } = require('../../config/db-config');
const { collections } = require('../../models');

async function register(body, callback) {

  const db = getDB();

  const user = await db.collection(collections.USER).findOne({
    name: body.name
  }).catch((err) => {
    console.log('In catch', err)
    return err
  });

  if (user) {
    return body = { statusCode: 400, message: 'user already exist' };
  }

  await db.collection(collections.USER).insertOne(body);
  return body = { statusCode: 200, message: 'user created' };

}

module.exports = {
  register
}
