const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB
require('./database/mongoDB-connection');
const Review = require('./models/review');

let newReview = { title: "Another one." }
// Template Engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// BODY-PARSER
//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// INDEX - See all reviews
app.get('/', (req, res) => {
  Review.find({}).then((reviewsData) => {
    res.render('reviews/index', {reviewsData});
  }).catch((err) => {
      res.send(err.message);
  });
});

// ROUTES - Reviews
const reviews = require('./controllers/reviews');
app.use('/reviews', reviews);


module.exports = app.listen(port, () => {
  console.log(`Port is listening on: ${port}`);
});
