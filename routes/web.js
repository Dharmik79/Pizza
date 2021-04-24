const homeController = require('../app/http/controller/homeController')
const authController = require('../app/http/controller/authController')
const cartController = require('../app/http/controller/customers/cartController')
const orderController = require('../app/http/controller/customers/orderController')
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const AdminOrderController = require('../app/http/controller/admin/orderController')
const admin = require('../app/http/middleware/admin')

function initRoutes(app) {


    app.get('/', homeController().index)


    
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postlogin)

    app.get('/register', guest, authController().register);

    app.post('/register', authController().postregister);

    app.get('/logout', authController().logout);



    app.get('/cart', cartController().index)

    app.post('/update-cart', cartController().update)
    // Customers routes
    app.post('/orders', auth, orderController().store)
    app.get('/customers/order', auth, orderController().index)
    app.get('/customers/order/:id', auth, orderController().show)
    // Admin routes

    app.get('/admin/orders', admin, AdminOrderController().index)

    app.post('/admin/order/status',admin,AdminOrderController().update)
}

module.exports = initRoutes