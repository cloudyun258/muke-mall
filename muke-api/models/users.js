// users 集合(表) 定义文件
const mongoose = require('./db')

const usersSchema = mongoose.Schema({
  userId: String,
  userName: String,
  userPwd: String,
  // 订单立标
  orderList: {
    type: [
      {
        orderId: String,
        // 订单生成时间
        createDate: String,
        orderAddress: Object,
        orderProduct: Array,
        orderPrice: Number
      }
    ],
    default: []
  },
  // 购物车列表
  cartList: {
    type: [
      {
        productId: String,
        productName: String,
        salePrice: Number,
        productImage: String,
        totalPrice: Number,
        checked: {
          type: Boolean,
          default: true
        },
        productNum: {
          type: Number,
          default: 1
        }
      }
    ],
    default: []
  },
  // 地址列表
  addressList: {
    type: [
      {
        addressId: String,
        userName: String,
        street: String,
        tel: String,
        isDefault: {
          type: Boolean,
          default: false
        }
      }
    ],
    default: []
  }
})

module.exports = mongoose.model('User', usersSchema)