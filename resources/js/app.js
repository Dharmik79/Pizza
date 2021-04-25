import axios from 'axios'
import moment from 'moment'
import Noty from 'noty'
import {
    initAdmin
} from './admin'

let addTocart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')


function updateCart(pizza) {

    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: "success",
            timeout: 100,
            progressBar: false,
            text: 'Item Added Successfuly to cart',
        }).show();
        

    }).catch(e => {
        new Noty({
            type: "error",
            timeout: 1000,
            progressBar: false,
            text: 'Something went wrong ',
        }).show();
    })

}

addTocart.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);

    })
})

const alertMsg = document.querySelector('#success-alert')
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}



// Change Order Status

let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time=document.createElement('small')

function updateStatus(order) {

    statuses.forEach((status)=>{
        status.classList.remove('step-completed');
         status.classList.remove('current');
         
    })
    let stepcompleted = true;
    statuses.forEach((status) => {
        let dataprop = status.dataset.status;
        if (stepcompleted) {
            status.classList.add('step-completed');
        }
        if (dataprop === order.status) {
            stepcompleted=false;
            time.innerText=moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current');
            }

        }
    })

}
updateStatus(order);

// Socket client Side

let socket=io()
if(order)
{
// Join 
socket.emit('join',`order_${order._id}`)
}

// For admin user 
let adminAreaPath=window.location.pathname;
console.log(adminAreaPath)

if(adminAreaPath.includes('admin'))
{initAdmin(socket)
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated',(data)=>{
    const updatedOrder={...order}  // to copy object in js use ...
    updatedOrder.updatedAt=moment().format()
    updatedOrder.status=data.status
    updateStatus(updatedOrder)
     new Noty({
            type: "success",
            timeout: 100,
            progressBar: false,
            text: 'Order Updated',
        }).show();
   
})