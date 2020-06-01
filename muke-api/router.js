// 路由规则
const handle = require('./handle')
const express = require('express')

// 创建路由对象
const router = express.Router()

// 注册路由规则
router.use(express.static('public'))
router.post('/login', handle.loginHandle)
router.post('/register', handle.registerHandle)
router.post('/addCart', handle.auth, handle.addCartHandle)
router.get('/goodsList', handle.goodsListHandle)
router.get('/userInfo', handle.auth, handle.userInfoHandle)
router.get('/cartList', handle.auth, handle.cartListHandle)
router.patch('/cartEdit', handle.auth, handle.cartEditHandle)
router.patch('/cartChecked', handle.auth, handle.cartCheckedHandle)
router.delete('/cartDel', handle.auth, handle.cartDelHandle)
router.get('/addressList', handle.auth, handle.addressListHandle)
router.patch('/addressDefault', handle.auth, handle.addressDefaultHandle)
router.delete('/addressDel', handle.auth, handle.addressDelHandle)
router.post('/addressAdd', handle.auth, handle.addressAddHandle)
router.get('/orderList', handle.auth, handle.orderListHandle)
router.post('/orderSuccess', handle.auth, handle.orderSuccessHandle)
router.get('/orderInfo', handle.auth, handle.orderInfoHandle)

// 导出路由对象
module.exports = router
