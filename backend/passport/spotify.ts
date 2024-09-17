// import passport from 'passport';
// import { Strategy as SpotifyStrategy } from 'passport-spotify';

// passport.use(
//   new SpotifyStrategy(
//     {
//         clientID: process.env.SPOTIFY_CLIENT_ID || '',
//         clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
//         callbackURL: process.env.SPOTIFY_CALLBACK_URL || ''
//     },
//     function(accessToken: any, refreshToken: any, expires_in: any, profile: any, done: any) {
//     //   User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
//         return done(null, profile);
//     //   });
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//     done(null, user);
// });
// passport.deserializeUser((user: string, done) => {
//     done(null, user)
//    });
 