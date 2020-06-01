// goods 集合(表) 定义文件
const mongoose = require('./db')

const goodsSchema = mongoose.Schema({
  productId: String,
  productName: String,
  salePrice: Number,
  stock: {
    type: Number,
    default: 10
  },
  productImage: String
})

module.exports = mongoose.model('Good', goodsSchema)