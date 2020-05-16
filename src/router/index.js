import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Address from '../views/Address'
import Cart from '../views/Cart'
import Goods from '../views/Goods'
import OrderConfirm from '../views/OrderConfirm'
import OrderSuccess from '../views/OrderSuccess'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/goods',
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: Goods
      }, {
        path: 'cart',
        name: 'Cart',
        component: Cart
      }, {
        path: 'address',
        name: 'Address',
        component: Address
      }, {
        path: 'orderConfirm/:id',
        name: 'orderConfirm',
        component: OrderConfirm
      }, {
        path: 'orderSuccess/:id',
        name: 'orderSuccess',
        component: OrderSuccess
      }
    ]
  } 
]

const router = new VueRouter({
  routes
})

export default router
