// db.js用于连接数据库
// 1. 引入
const mongoose = require('mongoose')

// 2.连接数据库
mongoose.connect('mongodb://localhost:27017/muke-mall', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // 使用 unique或者索引时要加
  useCreateIndex: true
})

mongoose.connection.on('error', () => { console.log('数据库连接失败la~') })

mongoose.connection.once('open', () => { console.log('数据库连接成功da~') })

//将 mongoose 导出
module.exports = mongoose