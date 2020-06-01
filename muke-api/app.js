const express = require('express')
const router = require('./router')

const app = express()

// 跨域
app.use(require('cors')())
// 处理 post 请求的数据
app.use(express.json())
app.use(express.urlencoded())

// 注册路由
app.use(router)

app.listen(3004, () => {
  console.log('RUN IN: http://localhost:3004')
})