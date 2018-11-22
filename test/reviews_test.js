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
                Review.find().then((reviews) => {
                    expect(reviews.length).to.equal(2);
                }).catch(e => e);
                return done();
            })
            .catch(e => done(e));
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
            .catch(e => done(e));
    });
    // CREATE
    it('should create a SINGLE review on /reviews POST', (done) => {
        const demoReview = ({
            title: 'This is a test for the sake of testing!',
            movieTitle: 'Don\'t watch!',
            description: 'Well this movie sucked ass...',
            rating: 0
        });
        chai.request(app)
            .post('/reviews')
            .send(demoReview)
            .then((res) => {
                expect(res).to.have.status(200); // basic test
                expect(res).to.be.html; // basic test
                Review.findOne({ title: demoReview.title }).then((review) => { // complex test
                    expect(demoReview.title).to.equal(review.title);
                    // need to find the proper way of testing redirecting
                    expect(res).to.redirect;
                    expect(res.redirects[0]).to.include(review._id); // makes sure the redirect url includes the Id
                    expect(res.req.path).to.not.equal(`${app.mountpath}`); // makes sure it redirected
                }).catch(e => e);
                expect(res).to.redirect;
                return done();
            })
            .catch(e => done(e));
    });
    // SHOW
    it('should show a SINGLE review on /reviews/<id> GET', (done) => {
        Review.find({}).then((data) => {
            let reviewId = String(data[0]._id)
            chai.request(app)
                .get(`/reviews/${reviewId}`)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    expect(res.req.path).to.include(reviewId);
                    // test if the data is in ??

                    return done();
                })
                .catch(e => done(e));
        }).catch(e => e);
    });
    // EDIT
    it('should edit a SINGLE review on /reviews/<id>/edit GET', (done) => {
        Review.find({}).then((data) => {
            let reviewId = String(data[0]._id)
            chai.request(app)
                .get(`/reviews/${reviewId}/edit`)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    expect(res.req.path).to.include(`${reviewId}/edit`);
                    return done();
                })
                .catch(e => done(e))
        }).catch(e => e);
    });
    // UPDATE
    it('should update a SINGLE review on /reviews/<id> PATCH', (done) => {
        Review.find({}).then((data) => {
            let reviewId = String(data[0]._id)
            chai.request(app)
                .patch(`/reviews/${reviewId}`)
                .send({
                    title: 'Making sure things changed',
                    description: 'This is to prove I did change this!',
                })
                .then((res) => {
                    expect(res).to.have.status(200);
                    // make sure the data is updated
                    Review.findOne({title: 'Making sure things changed'}).then((review) => {
                        expect(data[0]._id).to.equal(review._id); // make sure it is the same entry
                        expect(data[0].title).to.not.equal(review.title);
                        expect(data[0].movieTitle).to.equal(review.movieTitle);
                    }).catch(e => e);
                    expect(data.length).to.equal(2) // make sure it did not create a 3 entry
                    // make sure it redirects
                    expect(res).to.redirect;
                    expect(res.redirects[0]).to.include(data[0]._id); // makes sure the redirect url includes the Id
                    expect(res.req.path).to.not.equal(`${app.mountpath}`); // makes sure it redirected
                    // console.log(res.res._events.data[0]())
                    return done()
                })
                .catch(e => done(e));
        }).catch(e => e);
    });
    // DELETE
    it('should delete a SINGLE review on /reviews/<id> DELETE', (done) => {
        Review.find({}).then((data) => {
            let reviewId = String(data[0]._id)
            expect(data.length).to.equal(2);
            chai.request(app)
                .delete(`/reviews/${reviewId}`) // deleting the review from index [0]
                .then((res) => {
                    Review.find({}).then((_reviews) => {
                        expect(_reviews.length).to.equal(1);
                        expect(data[0]).to.not.equal(_reviews[0]);
                    }).catch(e => e);
                    return done();
                })
                .catch(e => done(e));
        }).catch(e => e);
    });
});
