const restify = require('restify')
const Router = require('restify-router').Router
const router = new Router()

// Get a persistence engine for the products
var productsSave = require('save')('products')

// Get all products in the system
console.log('GET /products list products')
router.get('/', function (req, res, next) {
  // Find every entity within the given collection
  productsSave.find({}, function (error, products) {
    // Return all of the products in the system
    res.send(products)
  })
})

  // Create a new product
console.log('POST /products new product')
router.post( '/', function (req, res, next) {
    
      // Make sure name is defined
  if (req.params.name === undefined) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('name must be supplied'))
  }
  if (req.params.price === undefined) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('price must be supplied'))
  }
  var newProduct = {
    name: req.params.name,
    price: req.params.price
  }

  // Create the product using the persistence engine
  productsSave.create(newProduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send the product if no issues
    res.send(201, product)
  })
})

// Get a single product by their product id
console.log('GET /products/:id get product by id')
router.get('/:id', function (req, res, next) {  
  // Find a single product by their id within save
  productsSave.findOne({ _id: req.params.id }, function (error, product) {
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (product) {
      // Send the product if no issues
      res.send(product)
    } else {
      // Send 404 header if the product doesn't exist
      res.send(404)
    }
  })
})
  
// Update a product by their id
console.log('PUT /products/:id update product')
router.put('/:id', function (req, res, next) {
  
  // Make sure name is defined
  if (req.params.name === undefined) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('name must be supplied'))
  }
  if (req.params.price === undefined) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('price must be supplied'))
  }

  var newProduct = {
    _id: req.params.id,
    name: req.params.name,
    price: req.params.price
  }

  // Update the product with the persistence engine
  productsSave.update(newProduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200)
  })
})

// Delete product with the given id
console.log('DEL /products/:id delete product')
router.del('/:id', function (req, res, next) {

  // Delete the product with the persistence engine
  productsSave.delete(req.params.id, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()
  })
})

// Delete ALL products
console.log('DEL /products del ALL products')
router.del('/', function (req, res, next) {
  productsSave.deleteMany({}, function (error) {
    if (error) {
      return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    }
    res.send(204)
  })
})

module.exports = router