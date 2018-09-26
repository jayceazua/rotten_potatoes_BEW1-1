const mongoose = require('mongoose');
 // Set a Mongoose Promise Library
mongoose.Promise = global.Promise;
const name = process.env.DB_NAME;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/${name}`
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Rotten Potatoes\' database is up!')
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
// mongoose.set('debug', true);
