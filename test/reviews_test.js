// reviews_test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const Review = require('../models/review');

chai.use(chaiHttp);

// tell mocha you want to test Reviews (this string is taco)
describe('Reviews', ()  => {
  // make taco name for the test
  it('Should index ALL reviews on / GET', (done) => {
    // use chai-http to make a request to your server
    chai.request(server)
        // send a GET request to root route
        .get('/')
        // wait for response
        .end((err, res) => {
          // check that the response status is = 200 (success)
          res.should.have.status(200);
          // check that the response is a type html
          res.should.be.html;
          // end this test and move onto the next.
          done();
        });
  });

  // TEST NEW
  it('Should display new form on /reviews/new GET', (done) => {
      chai.request(server)
        .get('/reviews/new')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
        });
    });
  // TEST CREATE
  it('Should create a new review /reviews POST', (done) => {

  })
  // TEST SHOW
  it('Should show an individual review /reviews/:id GET', (done) => {

  })
  // TEST EDIT
  it('Should show the individual review to update review /reviews/:id/edit GET', (done) => {

  })
  // TEST UPDATE
  it('Should update the individual review /reviews/:id PUT', (done) => {

  })
  // TEST DELETE
  it('Sould delete individual review /reviews/:id DETELE', (done) => {

  })
});
