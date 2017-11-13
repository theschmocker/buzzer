require('dotenv').config();
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const RateLimit = require('express-rate-limit');


const index = require('./routes/index');

const app = express();

app.enable('trust proxy');
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://jacobschmocker.com',
    optionsSuccessStatus: 200
}));

const reqLimiter = new RateLimit({
    windowMs: 5*60*1000, // 5 minutes
    max: 10,
    delayMs: 0,
    handler: function (req, res) {
        return res.send({message: 'Too many messages. Try again in a few minutes.'});
    },
});

app.use(reqLimiter);

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.log(err.message);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;
