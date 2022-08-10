const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    User.findOne({ email: email }).then(function (user) {
        if (!user || !user.validatePassword(password)) {
            return done(null, false, { errors: 'Wrong email or password.' });
        }
        return done(null, user);
    }).catch(done);
}));