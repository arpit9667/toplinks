const MONGOOSE = require('mongoose');

const { Schema, model } = MONGOOSE;

const userSchema = new Schema({
  name: String,
  oauth: {
    twitter: {
      id: String,
      oauthAccessToken: String,
      oauthAccessTokenSecret: String,
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const User = model('users', userSchema);

// export const UpsertUserFromTwitter = (twitterData, oauthAccessToken, oauthAccessTokenSecret) => new Promise((resolve, reject) => {
//   const { id_str: idStr, name } = twitterData;
//   User.findOne({ 'oauth.twitter.id': idStr }, (findError, dbUser) => {
//     if (findError) {
//       reject(findError);
//     } if (dbUser) {
//       resolve(dbUser);
//     } else {
//       const user = new User({
//         name,
//         oauth: {
//           twitter: {
//             id: idStr,
//             oauthAccessToken,
//             oauthAccessTokenSecret,
//           },
//         },
//       });
//       User.create(user, (createError, createdUser) => {
//         if (createError) {
//           reject(createError);
//         } if (createdUser) {
//           CreateUserTweets(createdUser).then((err) => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve();
//             }
//           });
//         }
//       });
//     }
//   });
// });

export default User;