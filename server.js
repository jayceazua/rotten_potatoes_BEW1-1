require('dotenv').config()
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB
require('./database/mongoDB-connection');

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
// override with POST having ?_method=DELETE & ?_method=PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


// ROUTES - Reviews
const reviews = require('./controllers/reviews');
const comments = require('./controllers/comments');
const movies = require('./controllers/movies')
const admin = require('./controllers/admin')
app.use(reviews);
app.use(comments);
app.use(movies)
app.use(admin)


app.listen(port, () => {
  console.log(`Port is listening on: ${port}`);
});

module.exports = { app };
