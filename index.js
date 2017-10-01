const SERVER_NAME = 'product-api'
const PORT = 8000;
const HOST = '127.0.0.1';
const utils = require('./utils/utils')
var restify = require('restify')

// Create the restify server
var server = restify.createServer({ name: SERVER_NAME})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

server.use( utils.requestLogger )

// Announce endpoints
console.log('Server endpoints:')
// handle products requests
require('./products/product-controller').applyRoutes(server, '/products')

// server ping (last route)
server.get('/', function pingSuccess (req, res, next) {
  'use strict'
  res.send(200)
})

server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
})