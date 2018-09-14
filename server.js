const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;


// Template Engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', (req, res) => {
  res.render('home', { msg: 'Whisky Tango Fox'})
})


module.exports = app.listen(port, () => {
  console.log(`Port is listening on: ${port}`);
});
