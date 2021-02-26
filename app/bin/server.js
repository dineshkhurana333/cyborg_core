const fs = require('fs');
const http = require('http');
const glob = require('glob');
const userCtrl = require('../modules/user/controller-user');
const userRoutes = require('../modules/user/routes-user');
const path = require('path');
const { URL } = require('url');

require('dotenv').config();
const server = http.createServer((req, res) => {
  const headers = req.headers;
  const url_method = req.method;
  const url = new URL(req.url).pathname
  const url_module = url.split('/')[0];

  let data = '';

  const routes = require(path.join(`../modules/${url_module}/routes-${url_module}`));

  console.log(Object.keys(routes))
  console.log(url)

  const route = (Object.keys(routes).indexOf(url) != -1) ? routes[url] : routes1.notFound;

  route(data, (statusCode, message) => {

    if (url_method === 'POST') {
      req.on('data', (part) => {
        data += part.toString();
      });
    }

    req.on('end', () => {
      const body = JSON.parse(data);

      if (url === 'register') {

        userCtrl.register(body).then((data) => {

          res.writeHead(data.statusCode, { 'content-type': 'application/json' });
          res.end(JSON.stringify({ data }));

        }).catch((err) => {

          console.log('error in creating user', err);
          res.writeHead(500, { 'content-type': 'application/json' });
          res.end(JSON.stringify({ message: 'Something went wrong' }));
        });
      }
    });

    req.on('error', e => { errorHandler(e) });
  });
});

function sampleRoute(data, callback) {

  return callback(200, { message: 'Helloworld' });
}

function notFound(data, callback) {

  return callback(404, { message: 'No url found' });
}

function methodNotAllowed(data, callback) {

  return callback(405);
}

function register(data, callback) {

  return callback(200, { message: 'Product saved' });
}

function errorHandler(err) {
  throw new Error(err);
}

const routes1 = {
  sample: sampleRoute,
  notFound: notFound,
  register: register,
  methodNotAllowed: methodNotAllowed
};

const port = process.env.SERVER_PORT;

server.listen(port, () => { console.log(`server is listening on port ${port}`) });
