import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';
import 'dotenv/config'


import WebAppAuthProvider from 'msal-node-wrapper'

const authConfig = {
    auth: {
        clientId: process.env.AUTH_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.AUTH_AUTHORITY}`,
        clientSecret: process.env.AUTH_CLIENT_SECRET,
        redirectUri: process.env.AUTH_REDIRECT,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
};

import apiv1Router from './routes/api/v1/apiv1.js';
import models from './models.js';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "key",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());

app.use((req, res, next) =>{
    console.log("session info:", req.session)
    next();
})

app.use((req, res, next) => {
    req.models = models;
    next();
});

app.use('/api/v1', apiv1Router);

app.get('/redirect', authProvider.authenticate(), (req, res) => {
    res.redirect('/');
});

app.get(
	'/signin',
	(req, res, next) => {
		return req.authContext.login({
			postLoginRedirectUri: "/",
		})(req, res, next);
	}
);

app.get(
	'/signout',
	(req, res, next) => {
		return req.authContext.logout({
			postLogoutRedirectUri: "/",
		})(req, res, next);
	}
);

app.use(authProvider.interactionErrorHandler());

export default app;
