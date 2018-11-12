const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const { reviews, populateReviews } = require('./seed/seed');
const expect = chai.expect;
// calling in my model schema for reviews
const Review = require('../models/review');
chai.use(chaiHttp);



describe('Reviews: ', ()  => {
    // Clean database of garbage data.
    after(() => {
        Review.deleteMany({})
        .exec((err, reviews) => {
            reviews.remove();
        });
    });
    beforeEach(populateReviews) // populate seed data for reviews
    // INDEX
    it('should index ALL reviews on / GET', (done) => {
        chai.request(app)
            .get('/')
            .then((res) => {
                expect(res).to.have.status(200);
                // better tests coming soon
                return done();
            })
            .catch(err => done(err));
    });
    // NEW
    it('should display new form on /reviews/new GET', (done) => {
        chai.request(app)
            .get('/reviews/new')
            .then((res) => {
                expect(res).to.have.status(200);
                // better tests coming soon
                expect(res).to.have.header('content-type', "text/html; charset=utf-8");
                return done();
            })
            .catch(err => done(err));
    });
    // CREATE
    it('should create a SINGLE review on /reviews POST', (done) => {
        const demoReview = ({
            title: 'This is a test for the sake of testing!',
            movieTitle: 'Don\'t watch!',
            description: 'Well this movie sucked ass...',
            rating: 0
        })
        chai.request(app)
            .post('/reviews')
            .send(demoReview)
            .then((res) => {
                expect(res).to.have.status(200); // basic test
                expect(res).to.be.html; // basic test
                Review.findOne({ title: demoReview.title }).then((review) => {
                    expect(demoReview.title).to.equal(review.title);
                    // need to find the proper way of testing redirecting
                }).catch((err) => { console.log(err.message) });
                expect(res).to.redirect;
                return done();
            })
            .catch(err => done(err));
    });
    // SHOW
    it('should show a SINGLE review on /reviews/<id> GET', (done) => {});
    // EDIT
    it('should edit a SINGLE review on /reviews/<id>/edit GET', (done) => {});
    // UPDATE
    it('should update a SINGLE review on /reviews/<id> PATCH', (done) => {});
    // DELETE
    it('should delete a SINGLE review on /reviews/<id> DELETE', (done) => {});
});
