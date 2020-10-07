const EXPRESS = require('express');
const OAUTH = require('oauth');

const ROUTE = EXPRESS.Router();

const config = new OAUTH.OAuth(
  'https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
  process.env.KEY, process.env.SECRET, '1.0A', 'http://localhost:3000/auth/twitter/callback', 'HMAC-SHA1',
);

ROUTE.get('/callback', function (req, res) {
  try {
    const { oauth_token_secret } = req.session['oauth:twitter'];
    const { oauth_token, oauth_verifier } = req.query;
    config.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier,
      (err, oauthAccessToken, oauthAccessTokenSecret) => {
        if(err){
          res.status(404).send(err);
        } else {
          console.log(oauthAccessToken, oauthAccessTokenSecret);
        }
      });
      res.send("Your account has been verified");
  } catch (e) {
    res.status(500).send(e);
  }
})

module.exports = ROUTE;