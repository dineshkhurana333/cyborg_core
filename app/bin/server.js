const fs = require('fs');
const http = require('http');
const user = require('../models/user')

require('dotenv').config();
const server = http.createServer((req, res) => {
  const headers = req.headers;
  const url_method = req.method;
  const url = req.url.replace('/', '');

  let data = '';

  const route = (Object.keys(routes).indexOf(url) != -1) ? routes[url] : routes.notFound;

  route(data, (statusCode, message) => {

    req.on('data', (part) => {
      console.log('Im here')
      data += part.toString();
    });

    req.on('end', () => {
      // fs.writeFileSync(__dirname + '/product.json', data);
      const { db } = require('../config/db-config');
      // console.log('data:: ', JSON.stringify(data))
      // console.log(data.name)

      const body = JSON.parse(data);

      db.collection('users').insertOne(body).then(() => {
        res.writeHead(statusCode, { 'content-type': 'application/json' });
        res.end(JSON.stringify(message));
      }).catch((err) => {
        console.log('error in creating user', err)
      });
    });

    req.on('error', e => { errorHandler(e) })
  });
});

function sampleRoute(data, callback) {

  return callback(200, { message: 'Helloworld' });
}

function notFound(data, callback) {

  return callback(404, { message: 'No url found' });
}

function register(data, callback) {

  return callback(200, { message: 'Product saved' });
}

function errorHandler(err) {
  throw new Error(err);
}

const routes = {
  sample: sampleRoute,
  notFound: notFound,
  register: register
};

const port = process.env.SERVER_PORT;

server.listen(port, () => { console.log(`server is listening on port ${port}`) });
