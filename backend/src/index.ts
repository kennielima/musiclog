import express from 'express';
import dotenv from 'dotenv';
import authRoute from './auth.route.js';
import cors from 'cors';
import session from "express-session";
import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';


dotenv.config();
const app = express();
const PORT = 4001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3002',
    credentials: true
}))

app.use(session({
      secret: process.env.SESSION_SECRET || '',
      resave: false,
      saveUninitialized: false,
    })
  );

app.use(passport.initialize())
app.use(passport.session())

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    callbackURL: process.env.SPOTIFY_CALLBACK_URL || ''
}, (accessToken, refreshToken, expires_in, profile, done) => {
        return done(null, { profile, accessToken });
    }));

passport.serializeUser((user, done) => {
    console.log('serialize user', user)
    done(null, user);
});

passport.deserializeUser((obj: any, done) => {
    console.log('deserialize user', obj)
    done(null, obj)
});

app.use('/', authRoute)

app.get('/auth/spotify',
    passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private'],
    })
);

app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/'}),
    function (req, res) {
            const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_CALLBACK_URL || '')}&state=123&scope=user-read-private%20user-read-email&show_dialog=true`;
            // res.redirect(spotifyUrl);
            // res.redirect('https://open.spotify.com');
            if(req.user) res.redirect('/home')
            }
);
app.get('/home', (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/spotify')
    } else {
        res.json({ user: req.user });
        // res.send(`Welcome, ${req.user.profile.displayName}`)
        console.log('user:',req.user)
   }
})

app.listen(PORT, () => {
    console.log('Server Running On 4001')
})








// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import authRoute from './auth.route.js';
// import cors from 'cors';
// // import session from 'express-session';
// // import pgSession from 'connect-pg-simple';
// import cookieSession from "cookie-session";
// import passport from 'passport';
// import { Strategy as SpotifyStrategy } from 'passport-spotify';
// // import { Pool } from 'pg';

// // In-memory user storage
// const users: { [key: string]: any } = {};

// dotenv.config();
// const app = express();
// // const PGSession = pgSession(session);
// // const pool = new Pool({
// //     connectionString: process.env.DATABASE_URL, // Replace with your connection string
// // });
// app.use(express.json());
// // app.use(cookieParser());
// app.use(cors({
//     origin: 'http://localhost:3002',
//     credentials: true
// }))
// const PORT = 4001;

// app.use('/', authRoute)

// app.use(
//     cookieSession({
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//       keys: [process.env.SESSION_SECRET || ""],
//     })
//   );

// // app.use(session({
// //     store: new PGSession({
// //         conObject: {
// //             // pool: pool as any, 
// //             // tableName: 'session',
// //             connectionString: process.env.DATABASE_URL,
// //         },
// //     }),
// //     secret: process.env.SESSION_SECRET || '',
// //     resave: false,
// //     saveUninitialized: false,
// //     cookie: {
// //         // secure: NODE_ENV === 'production',
// //         maxAge: 24 * 60 * 60 * 1000,
// //     },
// // }));
// app.use(cookieSession({secret: '389'}))
// app.use(passport.initialize())
// app.use(passport.session())

// passport.serializeUser((user, done) => {
//     console.log('serialize user' , user)
//     done(null, user);
// });

// passport.deserializeUser((user: string, done) => {
//    console.log('deserialize user', user)
//    done(null, user)
//   });

// // passport.deserializeUser((user: false | null | undefined, done) => {
// //     done(null, user);
// // });

// passport.use(new SpotifyStrategy({
//     clientID: process.env.SPOTIFY_CLIENT_ID || '',
//     clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
//     callbackURL: process.env.SPOTIFY_CALLBACK_URL || ''
// }, (accessToken: any, refreshToken: any, expires_in: any, profile: any, done: any) => {
//      // Store user in the in-memory map
//      users[profile.id] = {
//         profile,
//         accessToken,
//         refreshToken,
//       };
    
//     return done(null, {profile, accessToken});
// }));


// app.get('/auth/spotify',
//     passport.authenticate('spotify', {
//         scope: ['user-read-email', 'user-read-private'],
//     })
// );

// app.get(
//     '/auth/spotify/callback',
//     passport.authenticate('spotify', {
//         failureRedirect: '/'
//     }),
//     function (req, res) {
//         res.redirect('/home');
//     }
// );
// app.get('/home', (req, res) => {
//     if (!req.isAuthenticated()){
//         // return res.status(401).json({ error: 'Unauthorized' });
//         res.redirect('/auth/spotify')
//     } else{
//         const user = users[req.user as string]
//     res.json({profile: user.profile, accessToken: user.accessToken})
//     }
// })

// app.listen(PORT, () => {
//     console.log('Server Running On 4001')
// })
