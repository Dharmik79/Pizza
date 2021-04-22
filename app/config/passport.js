const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const User = require('../models/users')


function init(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {

        //Login
        // Check for User in DataBase
        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return done(null, false, {
                message: "No email found"
            })
        }
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, {
                    message: "Logged in Successfully"
                })
            }
            return done(null, false, {
                message: "Wrong Username or Password"
            })
        }).catch(err => {
            return done(null, false, {
                message: "Something went wrong"
            })

        })

    }))

    passport.serializeUser((user, done) => {
        done(null, user._id )
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err,user);
        })
    })



}

module.exports = init