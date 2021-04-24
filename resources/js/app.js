import axios from 'axios'
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
        }).show();3000

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

initAdmin()