const order = require("../../../models/order")

function orderController() {
    return {
        index(req, res) {

            order.find({
                status: {
                    $ne: 'completed'
                }
            }, null, {
                sort: {
                    'createdAt': -1
                }
            }).populate('customerId', '-password').exec((err, orders) => {
                if (req.xhr) {

                    return res.json(orders)
                }
                return res.render('admin/orders')

            })
        },
        update(req, res) {
            order.updateOne({
                _id: req.body.orderId
            }, {
                status: req.body.status
            }, (err, data) => {
                if (err) {
                   
                    return res.redirect('/admin/orders')
                }
                // Emit the event
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', {
                    id: req.body.orderId,
                    status: req.body.status
                })
                return res.redirect('/admin/orders')
            })
        }
    }
}

module.exports = orderController