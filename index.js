const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const CORS = require('cors');
const SESSION = require('express-session');
const PASSPORT = require('passport');
const Strategy = require('passport-twitter').Strategy;
const dotenv = require('dotenv');
// dotenv.config({
//   path: `.env`
// })

console.log(process.env.KEY);
PASSPORT.use(new Strategy({
  consumerKey: process.env.KEY,
  consumerSecret: process.env.SECRET,
  callbackURL: 'http://localhost:3000/auth/twitter/callback'
}, function (token, tokenSecret, profile, callback) {
  console.log(token, tokenSecret);
  return callback(null, profile);
}));

PASSPORT.serializeUser(function (user, callback) {

  callback(null, user);
})

PASSPORT.deserializeUser(function (obj, callback) {
  callback(null, obj);
})


const app = EXPRESS();

app.use(CORS());
app.use(BODY_PARSER.json());
app.use(BODY_PARSER.urlencoded({
  extended: true
}));
app.use(SESSION({ secret: "twitter_toplinks", resave: false, saveUninitialized: true }))

app.use(PASSPORT.initialize())
app.use(PASSPORT.session())

app.get('/', PASSPORT.authenticate('twitter'));
app.use('/auth/twitter', require('./routes/user'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up and running on Port ${PORT}`);
});