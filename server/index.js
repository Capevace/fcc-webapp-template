require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const schemas = require('./schemas');

mongoose.connect(process.env.MONGO_URL);

app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(path.resolve(__dirname, '../build/public')));

app.use(session({ secret: 'mysecret' }));
app.use(cookieParser());
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

// config passport
require('./passport')(passport);

const routes = require('./routes');

routes(app, passport);

app.listen(app.get('port'), () => console.log('Listening on', app.get('port')));
