function authController() {
    // Factory functions  - a function that returns object 

    return {
        // index method for read
        login(req,res) {
            res.render('auth/login');
        },
        register(req,res)
        {
            res.render('auth/register');
        }
    }
}

module.exports=authController;