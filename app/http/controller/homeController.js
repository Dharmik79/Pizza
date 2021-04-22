const Menu = require('../../models/menu')

function homeController() {
    // Factory functions  - a function that returns object 

    return {
        // index method for read
        async index(req, res) {
            try{
            const pizzas=await Menu.find()
            console.log(pizzas)
            
             res.render('home',{pizzas:pizzas});
            }
            catch{

            }
        }
    }
}

module.exports = homeController;