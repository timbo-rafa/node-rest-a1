const should = require('should')
const supertest = require('supertest')
const app = require('../index')

var productsSave = require('save')('products')


describe('product controller', function () {
  'use strict'

  var pen = {
    name: 'pen',
    price: '1.00'
  }, pencil = {
    name: 'pencil',
    price: '0.50'
  }, paper = {
    name: 'paper sheet',
    price: '3.50'
  }
  before(function (done) {
    productsSave.create(pen, done)
  })
  before( function (done) {
    productsSave.create(pencil, done)
  })
  before (function (done) {
    productsSave.create(paper, done)
  })


  it('should list all products', function (done) {
    var request = supertest(app)
    request = request.get('/products')
    //.send()
    .expect(200)
    .expect(function (res) {
      productsSave.find({}, function (error, products) {
        console.log('found:', products)
      })
      //res.body.should.be.instanceOf(Array)
      //   .with.lengthOf(3)
      console.log(res.body)
    })
    .end(done)
  })
})