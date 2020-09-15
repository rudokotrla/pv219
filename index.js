const express = require('express');
const mongoose = require('mongoose');
const requestRoutes = require('./api/requests');
const userRoutes = require('./api/users');
const searchRoutes = require('./api/search');
const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const {ensureAuthenticated} = require('./auth');

//app creation
const app = express();

//Dotenv config
require('dotenv').config();

//Passport config
require('./passport')(passport);

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
    res.render('login', {layout: false});
});

app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {layout: 'dashboard-layout.hbs'});   
});


const PORT = process.env.PORT || 5000;

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(
    () => console.log("DB connect succeeded"),
    (err) => console.log("Connection error occured " + err)
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));