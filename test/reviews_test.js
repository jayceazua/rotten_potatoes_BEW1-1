const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const { reviews, populateReviews } = require('./seed/seed');
const expect = chai.expect;
// calling in my model schema for reviews
const Review = require('../models/review');
const Comment = require('../models/comment');
chai.use(chaiHttp);



describe('Reviews: ', ()  => {
    // Clean database of garbage data.
    after(() => {
        Review.deleteMany({})
        .then((reviews) => {
            reviews.remove()
        })
        .catch(err => err)
    });

    beforeEach(populateReviews) // populate seed data for reviews

    // INDEX
    it('should index ALL reviews on / GET', (done) => {
        Review.find({}).then((_reviews) => { // confirming data is in !
            chai.request(app)
                .get('/')
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', "text/html; charset=utf-8");
                    // better tests coming soon
                    expect(res.text).to.have.string(`${_reviews[0]._id}`);
                    expect(res.text).to.have.string(`${_reviews[1]._id}`);
                    expect(res.text).to.have.string(`${_reviews[1].movieTitle}`);
                    expect(res.text).to.have.string(`${_reviews[0].movieTitle}`);
                    expect(res.text).to.have.string(`${_reviews[0].title}`)
                    expect(res.text).to.have.string(`${_reviews[1].title}`)
                    return done();
                })
                .catch(e => done(e));
        }).catch(e => e);
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
            description: 'Well this movie sucked ass...'
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
                // console.log(res.body)
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
                    expect(res.text).to.have.string(`${data[0].title}`)
                    expect(res.text).to.have.string(`${data[0].movieTitle}`)
                    expect(res.text).to.have.string(`${data[0]._id}`)
                    expect(res.text).to.have.string(`${data[0].description}`)
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
                    expect(res.text).to.have.string(`${data[0].title}`)
                    expect(res.text).to.have.string(`${data[0].movieTitle}`)
                    expect(res.text).to.have.string(`${data[0]._id}`)
                    expect(res.text).to.have.string(`${data[0].description}`)
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
                    expect(res).to.have.status(200)
                    Review.find({}).then((_reviews) => {
                        expect(_reviews.length).to.equal(1);
                        expect(data[0]).to.not.equal(_reviews[0]);
                    }).catch(e => e);
                    expect(res).to.redirect;
                    return done();
                })
                .catch(e => done(e));
        }).catch(e => e);
    });


    describe('Comments:', () => {
        // Clean database of garbage data.
        after(() => {
            Comment.deleteMany({})
            .then((comments) => {
                comments.remove()
            })
            .catch(e => e)
        });
        // CREATE
        it('should create a SINGLE comment on /reviews/comments POST', (done) => {
            Review.find({}).then((_reviews) => {
                const demoComment = {
                    title: 'Demo Comment Title',
                    content: 'This is a sample demo comment description.',
                    reviewId: String(_reviews[0]._id)
                }
                chai.request(app)
                    .post('/reviews/comments')
                    .send(demoComment)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        Comment.find({reviewId: String(_reviews[0]._id)}).then((comments) => {
                            expect(comments.length).to.equal(1)
                            expect(comments[0].title).to.equal(demoComment.title)
                            expect(comments[0].title).to.equal(demoComment.content)
                            expect(comments[0].reviewId).to.equal(demoComment.reviewId)
                        }).catch(e => e)
                        expect(res.redirects[0]).to.include(_reviews[0]._id); // makes sure the redirect url includes the Id
                        expect(res.req.path).to.not.equal(`${app.mountpath}`);
                        return done();
                    })
                    .catch(e => done(e))
            }).catch(e => e)
        });
        // DELETE
        it('should delete a SINGLE comment on /reviews/comments/<id> DELETE', (done) => {
            Comment.find({}).then((comments) => {
                const commentId = String(comments[0]._id);
                expect(comments.length).to.equal(1)
                chai.request(app)
                    .delete(`/reviews/comments/${commentId}`)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.redirect;
                        return done()
                    })
                    .catch(e => done(e));
            }).catch(e => e);
        })
    });
});
