const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
  { title: "Great Review" },
  { title: "Next Review" }
]

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

// INDEX - See all reviews
app.get('/', (req, res) => {
  reviews.push(newReview)
  res.render('reviews/index', {reviews});
})

// ROUTES - Reviews
const reviews = require('./controllers/reviews');
app.use('/reviews', reviews);


module.exports = app.listen(port, () => {
  console.log(`Port is listening on: ${port}`);
});
