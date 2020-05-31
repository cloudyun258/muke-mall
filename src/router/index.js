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
        path: 'orderConfirm',
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

/*
vue-router3.1+版本路由跳转时(一般是跳转到同一路由时)报如下错误
NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}]

原因在于Vue-router在3.1之后把 $router.push() 方法改为了Promise。
所以假如没有回调函数，错误信息就会交给全局的路由错误处理，因此就会报上述的错误

解决方法1： 使用 3.07以下版本vue-router
    方法2：禁止全局路由错误处理打印，这个也是vue-router开发者给出的解决方案
           解决代码如下
    方法3: 为每个router.push增加错误捕获回调函数 
           this.$router.push('/xxx').catch(err => {err})
*/
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
