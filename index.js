const SERVER_NAME = 'product-api'
const PORT = 8000;
const HOST = '127.0.0.1';

var restify = require('restify')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())



// handle products requests
require('./products/product-controller').applyRoutes(server, '/products')

server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /products')
  console.log(' /products/:id')  
})