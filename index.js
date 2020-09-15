const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const hbs = require('express-handlebars');

const requestRoutes = require(path.join(__dirname, 'api', 'requests'));
const userRoutes = require(path.join(__dirname, 'api', 'users'));
const searchRoutes = require(path.join(__dirname, 'api', 'search'));
const {ensureAuthenticated} = require(path.join(__dirname, 'auth'));
const config = require(path.join(__dirname, 'config'));

//app creation
const app = express();

//Dotenv config
require('dotenv').config();

//Passport config
require(path.join(__dirname, 'passport'))(passport);

//Setup
app.use(express.urlencoded({extended: 'false'}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: path.join(__dirname, 'views', 'layouts')}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/requests', requestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));



//static page routing

app.all('*',(req, res, next) => {
    console.log("New request " + req.url)
    next();
});

app.get('/', (req, res) => {
    res.redirect('index'); 
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/request', (req, res) => {
    res.render('request');
});

app.get('/request-sent', (req, res) => {
    res.render('request-sent');
});

app.get('/login', (req, res) => {
    res.render('login', {layout: 'login-layout.hbs'});
});

app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {layout: 'dashboard-layout.hbs'});   
});


const PORT = process.env.PORT || 5000;

//Connect to DB
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(
    () => console.log("DB connect succeeded"),
    (err) => console.log("Connection error occured " + err)
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));