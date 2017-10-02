const SERVER_NAME = 'product-api'
const PORT = 8000;
const HOST = '127.0.0.1';
//const utils = require('./utils/utils')
const restify = require('restify')
const morganLogger = require('morgan')

// Create the restify server
const server = restify.createServer({ name: SERVER_NAME})

server
  .use(morganLogger(':date[web] - :method :url :status :response-time ms'))
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.acceptParser(server.acceptable))
  .use(restify.bodyParser())
  .use(restify.queryParser())
  //server.use( utils.requestLogger )
  .use(function (request, response, next) {
    response.header('Content-Type', 'application/json')
    response.header('Content-Encoding', 'UTF-8')
    response.header('Content-Language', 'en')
    next()
  })


const productRouter = require('./product/product-controller')  
// Announce endpoints
console.log('Server endpoints:')
// handle products requests
productRouter.applyRoutes(server, '/products')

// server ping (last route)
server.get('/', function pingSuccess (req, res, next) {
  'use strict'
  res.send(200)
})

server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
})

module.exports = server