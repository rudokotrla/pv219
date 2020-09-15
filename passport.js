const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
//Admin user stored here
const config = require(path.join(__dirname, 'config'));
module.exports = function(passport){
    passport.use(
        new LocalStrategy((username, password, done) => {
            //Check username
            if (username != config.admin.username){
                console.log("usernames dont match");
                return done(null, false, {message: 'Bad username'});
            }

            //Check passoword
            bcrypt.compare(password, config.admin.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    console.log("Logged in!")
                    return done(null, config.admin);
                }
                else {
                    console.log("Passwds dont match");
                    return done(null, false, {message: 'Password incorrect'});
                }
            });
        } )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
          done(null, config.admin);
    });
}