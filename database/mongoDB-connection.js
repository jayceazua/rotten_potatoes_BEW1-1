const mongoose = require('mongoose');
 // Set a Mongoose Promise Library
mongoose.Promise = global.Promise;
const dbname = process.env.DB_NAME;
const dbpassword = process.env.DB_PASSWORD;
const dbuser = process.env.DB_USER;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rotten_potatoes';
// `mongodb://${dbuser}:${dbpassword}@ds115283.mlab.com:15283/${dbname}`
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Rotten Potatoes\' database is up!')
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false); // corrects the annoying DeprecationWarning
// mongoose.set('debug', true);


/*
    for ... in // index or key in an array or object
    for ... of // value for object or array
*/
