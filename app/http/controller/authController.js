const User = require('../../models/users')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    // Factory functions  - a function that returns object 

    return {
        // index method for read
        login(req, res) {
            res.render('auth/login');
        },
        logout(req,res)
        {
            req.logout()
            return res.redirect('/login')
        },

        async postlogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err);
                }
                if (!user) {

                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)

                        return next(err);
                    }
                    return res.redirect('/')
                });

            })(req,res,next);
        },
        register(req, res) {
            res.render('auth/register');
        },
        async postregister(req, res) {
            // Logic for Register
            const {
                name,
                email,
                password
            } = req.body;
            if (!name || !email || !password) {
                req.flash('error', 'All fileds are required');
                req.flash('email', email),
                    req.flash('name', name)
                return res.redirect('/register')
            }
            // Check if the email exists
            User.exists({
                email: email
            }, (err, result) => {
                if (result) {
                    req.flash("error", "User already register try with another email"),
                        req.flash('email', email),
                        req.flash('name', name)
                    return res.redirect('/register')
                }

            })

            // Donot store password directly to database ,first encrypt it and then store it
            // Hash Password
            const hashedPassword = await bcrypt.hash(password, 10)

            const user = new User({
                name: name,
                email: email,
                password: hashedPassword

            })
            user.save().then((user) => {
                // Login


                return res.redirect('/')
            }).catch(err => {
                req.flash("error", "Something went wrong")

                return res.redirect('/register')

            })
        }
    }
}

module.exports = authController;