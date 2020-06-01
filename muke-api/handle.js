// 路由处理函数
const usersModel = require('./models/users')
const goodsModel = require('./models/goods')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

// 用于 生成token 和 解密token 的字符串, 随意定义
const SECRET = 'hdfgsdfgsdf2121sfdas'

module.exports = {
  // 用来验证token的中间件函数
  async auth (req, res, next) {
    // 获取请求头中的token
    const tokenStr = String(req.headers.authorization)
    // 解析token
    jwt.verify(tokenStr, SECRET, async (err, tokenRes) => {
      // token无效
      if (err) {
        res.json({
          status: 10,
          msg: '当前未登录',
          data: {}
        })
        return
      }
      req.tokenRes = tokenRes
      next()
    })
  },
  // 登录路由处理
  async loginHandle (req, res, next) {
    // 获取用户名
    let username = req.body.username
    // 获取用户密码
    let password = req.body.password
    // 根据用户名查找用户
    const user = await usersModel.findOne({ userName: username })
    // 用户不存在
    if (!user) {
      res.json({
        status: 1,
        msg: '用户名不正确',
        data: {}
      })
      return
    }
    // 用户存在, 验证密码
    const isPwd = password === user.userPwd ? true : false
    // 密码错误
    if (!isPwd) {
      res.json({
        status: 1,
        msg: '密码错误',
        data: {}
      })
      return
    }
    // 登陆成功, 生成token
    const token = jwt.sign({
      id: String(user._id)
    }, SECRET)
    // 返回token
    res.json({
      status: 0,
      msg: '登录成功',
      token: token,
      data: user
    })
  },
  // 注册路由处理
  async registerHandle (req, res, next) {
    // 根据用户名查找用户
    const isUser = await usersModel.findOne({ userName: req.body.username })
    // 用户名已存在
    if (isUser) {
      res.json({
        status: 1,
        msg: '该用户已存在',
        data: {}
      })
      return
    }
    // 查询用户, 以便生成新用户的userId, 避免重复
    let userArr = await usersModel.find()
    // 用最后一个用户的Id加1
    let userId = Number(userArr[userArr.length - 1].userId) + 1
    // 创建用户并写入数据库, user是写入之后返回的用户信息，包含 _id, _v等字段
    const user = await usersModel.create({
      userId: String(userId),
      userName: req.body.username,
      userPwd: req.body.password,
    })
    res.json({
      status: 0,
      msg: '注册成功',
      data: {
        _id: user._id,
        id: user.id,
        username: user.userName
      }
    })
  },
  // 获取商品理由处理
  async goodsListHandle (req, res, next) {
    // 获取第几页数据, 不传为第一页
    let page = Number(req.query.page) ? Number(req.query.page) : 1
    // 每页多少条数据, 不传获取所有数据
    let pageSize = Number(req.query.pageSize) ? Number(req.query.pageSize) : 9999
    // 升降序, 1为升序, -1为降序, 默认为1 
    let sort = Number(req.query.sort) === -1 ? -1 : 1 
    // 需要跳过的数据条数
    let skip = (page - 1) * pageSize
    // 价格过滤
    let priceRange = Number(req.query.priceRange) ? Number(req.query.priceRange) : 0
    // 查询条件
    let params = { }
    // 价格区间
    let priceGt, priceLte
    // 根据priceRange的值填写价格的最大最小值 (priceGt, priceLte] 
    switch (priceRange) {
      case 0: 
        priceGt = 0
        priceLte = 5000
        break
      case 1: 
        priceGt = 0
        priceLte = 100
        break
      case 2: 
        priceGt = 100
        priceLte = 500
        break
      case 3: 
        priceGt = 500
        priceLte = 1000
        break
      case 4: 
        priceGt = 1000
        priceLte = 5000
        break
    }
    params = {
      salePrice: { $gt: priceGt, $lte: priceLte }
    }
    const goods = await goodsModel.find().where(params).sort({ salePrice: sort })
    .skip(skip).limit(pageSize)
    res.json({
      status: 0,
      msg: '获取商品数据成功',
      data: goods
    })
  },
  // 添加购物车路由处理
  async addCartHandle (req, res, next) {
    // 获取要添加的商品Id
    let productId = req.body.productId
    // 验证成功根据tokenRes去查找用户信息
    let userInfo = await usersModel.findById(req.tokenRes.id)
    // 查询要添加的商品信息
    let productItem = await goodsModel.findOne({ productId: productId })
    // 商品已不存在
    if (!productItem) {
      res.json({
        status: 1,
        msg: '该商品不存在或已下架',
        data: {}
      })
      return
    }
    // 是否已有商品标记
    let isHave = false
    // 遍历cartList以判断要添加的商品是否存在购物车列表中
    userInfo.cartList.forEach(async item => {
      // 已存在该商品
      if (item.productId === productId ) {
        // 数量加1
        item.productNum ++
        item.checked = true
        // 该商品总价格
        item.totalPrice = item.productNum * item.salePrice
        isHave = true
        // 保存更新数据
        await userInfo.save()
      }
    })
    // 列表未存在该商品
    if (!isHave) {
      // 为什么要这样? 因为productItem好像不能增加表结构中不存在的属性
      let proItem = {  }
      for (key in productItem) {
        proItem[key] = productItem[key]
      }
      proItem.productNum = 1
      proItem.checked = true
       // 该商品总价格
      proItem.totalPrice = proItem.salePrice
      userInfo.cartList.push(proItem)
      // 保存更新数据
      await userInfo.save()
    }
    res.json({
      status: 0,
      msg: '添加购物车成功',
      data: userInfo
    })
  },
  // 获取用户信息
  async userInfoHandle (req, res, next) {
    // 验证成功根据tokenRes去查找用户信息
    let userInfo = await usersModel.findById(req.tokenRes.id)
    res.json({
      status: 0,
      msg: '获取用户信息成功',
      data: userInfo
    })
  },
  // 获取购车车列表
  async cartListHandle (req, res, next) {
     // 验证成功根据tokenRes去查找用户信息
    let userInfo = await usersModel.findById(req.tokenRes.id)
    // 获取第几页数据, 不传为第一页
    let page = Number(req.query.page) ? Number(req.query.page) : 1
    // 每页多少条数据, 默认为5
    let pageSize = Number(req.query.pageSize) ? Number(req.query.pageSize) : 5
    // 要跳过的条数
    let skip = (page - 1) * pageSize
    // 实际返回的购物车列表数组
    let cartArr = []
    for (let i = skip; i < skip + pageSize; i++) {
      if (userInfo.cartList[i]) {
        cartArr.push(userInfo.cartList[i])
      }
    }
    // 记录购物车商品是否全选中
    let checkedAll = true
    userInfo.cartList.forEach((item, index) => {
      if (!item.checked) {
        checkedAll = false
      }
    })
    // 记录购物车已选商品总价
    let checkedTotalPrice = 0
    userInfo.cartList.forEach((item, index) => {
      if (item.checked) {
        checkedTotalPrice += item.salePrice * item.productNum
      }
    })
    res.json({
      status: 0,
      msg: '获取购物车列表成功',
      data: {
        // 购物车商品总数量
        total: userInfo.cartList.length,
        // 是否全选中
        checkedAll: checkedAll,
        // 已选商品总价
        checkedTotalPrice: checkedTotalPrice,
        // 当前页数据
        cartList: cartArr
      }
    })
  },
  // 编辑商品路由处理
  async cartEditHandle (req, res, next) {
    // 获取编辑的类型
    let editType = req.body.editType
    // 获取要编辑的商品Id
    let productId = req.body.productId
    // 查询要编辑的商品所属的用户
    let userInfo = await usersModel.findOne({ _id: req.tokenRes.id })
    // 查询商品
    let goods = await goodsModel.findOne({ productId: productId })
      // 商品已不存在
    if (!goods) {
      res.json({
        status: 1,
        msg: '该商品不存在或已下架',
        data: {}
      })
      return
    }
    if (editType === 'cut') {
      userInfo.cartList.forEach((item, index) => {
        if (item.productId === productId) {
          item.productNum --
          item.totalPrice = item.productNum * item.salePrice
        }
      })
    } else if (editType === 'add') {
      userInfo.cartList.forEach((item, index) => {
        if (item.productId === productId) {
          if (item.productNum >= goods.stock) {
            res.json({
              status: 1,
              msg: '库存不足',
              data: {}
            })
            return
          } else {
            item.productNum ++
            item.totalPrice = item.productNum * item.salePrice
          }
        }
      })
    } else {
      userInfo.cartList.forEach((item, index) => {
        if (item.productId === productId) {
          item.checked = !item.checked
        }
      })
    }
    // 记录编辑后购物车商品总数
    let cartCount = 0
    userInfo.cartList.forEach((item, index) => {
      cartCount += item.productNum
    })
    await userInfo.save()
    res.json({
      status: 0,
      msg: '编辑商品成功',
      cartCount: cartCount,
      data: {}
    })
  },
  // 全选非全选路由处理
  async cartCheckedHandle (req, res, next) {
    // 查询要编辑所属的用户
    let userInfo = await usersModel.findOne({ _id: req.tokenRes.id })
    // 获取是全选中还是全不选中
    const checkedFlag = req.body.checkedAllFlag
    // 设置商品选中状态
    userInfo.cartList.forEach((item, index) => {
      item.checked = checkedFlag
    })
    await userInfo.save()
    res.json({
      status: 0,
      msg: '操作成功',
      data: {}
    })
  },
  // 删除购物车商品路由处理
  async cartDelHandle (req, res, next) {
    // 获取要删除的商品Id
    const productId = req.query.productId
    // 查询要编辑所属的用户
    let userInfo = await usersModel.findOne({ _id: req.tokenRes.id })
    // 遍历删除商品
    let delItem
    userInfo.cartList.forEach((item ,index) => {
      if (item.productId === productId) {
        delItem = userInfo.cartList.splice(index, 1)
      }
    })
    // 记录删除后购物车商品总数
    let cartCount = 0
    userInfo.cartList.forEach((item, index) => {
      cartCount += item.productNum
    })
    await userInfo.save()
    res.json({
      status: 1,
      msg: '删除商品成功',
      cartCount: cartCount,
      data: delItem
    })
  },
  // 获取地址路由处理
  async addressListHandle (req, res, next) {
     // 查询地址所属的用户
     let userInfo = await usersModel.findOne({ _id: req.tokenRes.id })
     res.json({
       status: 0,
       msg: '获取地址列表成功',
       data: userInfo.addressList
     })
  },
  // 设置默认地址路由处理
  async addressDefaultHandle (req, res, next) {
    let addressId = req.body.addressId
    // 查询地址所属的用户
    let userInfo = await usersModel.findOne({ _id: req.tokenRes.id })
    // 要设置默认的地址
    let addressItem = []
    // 当前地址isDefault设置为true, 其他设置为false
    userInfo.addressList.forEach((item, index) => {
      if (item.addressId === addressId) {
        item.isDefault = true
        addressItem = item
      } else {
        item.isDefault = false
      }
    })
    await userInfo.save()
    res.json({
      status: 0,
      msg: "设置默认地址成功",
      data: addressItem
    })
  },
  // 删除地址
  async addressDelHandle (req, res, next) {
    // 要删除的地址Id
    let addressId = req.query.addressId
    // 查询地址所属的用户
    let userInfo = await usersModel.findOne({ _id: req.tokenRes.id })
    // 当前删除的地址项
    let addressitem = []
    userInfo.addressList.forEach((item, index) => {
      if (item.addressId == addressId) {
        addressitem = userInfo.addressList.splice(index, 1)
         // 如果要删除的地址是默认地址, 则删除后将第一个地址设置为默认地址
        if (item.isDefault && userInfo.addressList[0]) {
          userInfo.addressList[0].isDefault = true
        }
      }
    })
    await userInfo.save()
    res.json({
      status: 0,
      msg: '删除地址成功',
      data: addressitem
    })
  },
  // 添加地址路由处理
  async addressAddHandle (req, res, next) {
    // 查询地址所属的用户
    let userInfo = await usersModel.findOne({ _id: req.tokenRes.id })
    // 用户名
    let userName = req.body.name
    // 电话
    let tel = req.body.phone
    // 地址
    let street = req.body.street
    // 是否默认地址
    let isDefault = req.body.isDefault
    // 生成新地址Id
    let addressId = 2017000
    /* 因为添加地址时可能添加到头部也可能尾部，所以不能直接用数据最后一个加1
     需要找出地址Id最大的那一个加1  */
    userInfo.addressList.forEach((item, index) => {
      if (Number(item.addressId) > addressId) {
        addressId = Number(item.addressId)
      } 
    })
    // 地址信息
    let addressInfo = {
      addressId: String(addressId + 1),
      userName,
      tel,
      street,
      isDefault
    }
    // 判断新增地址是否是默认地址
    if (isDefault) {
      // 如果是, 将当前数据库中的isDefault全置为false
      userInfo.addressList.forEach((item, index) => {
        item.isDefault = false
      })
       // 将新地址追加到数据头部
      userInfo.addressList.unshift(addressInfo)
    } else {
      // 添加到最后
      userInfo.addressList.push(addressInfo)
    }
    await userInfo.save()
    res.json({
      status: 0,
      msg: '添加地址成功',
      data: addressInfo
    })
  },
  // 获取已选商品路由处理
  async orderListHandle (req, res, next) {
    // 查询当前用户信息
    let userInfo = await usersModel.findOne({ _id: req.tokenRes.id })
    // 保存当前订单选中的商品
    let checkProduct = []
    userInfo.cartList.forEach((item ,index) => {
      if (item.checked) {
        checkProduct.push(item)
      }
    })
    res.json({
      status: 0,
      msg: '获取订单商品成功',
      data: checkProduct
    })
  },
  // 订单生成路由处理
  async orderSuccessHandle (req, res, next) {
    // 查询当前用户信息
    let userInfo = await usersModel.findOne({ _id: req.tokenRes.id })
     // 保存当前订单选中的商品
    let orderProduct = []
    // 订单总价钱
    let orderPrice = 0
    userInfo.cartList.forEach((item ,index) => {
      if (item.checked) {
        orderProduct.push(item)
        orderPrice += item.totalPrice
      }
    })
    orderPrice = orderPrice + 100 + 200 + 400
    // 保存当前订单地址
    let orderAddress = {}
    userInfo.addressList.forEach((item, index) => {
      if (item.isDefault) {
        orderAddress = item
      }
    })
    // 生成两个0-9随机数
    const r1 = Math.floor(Math.random() * 10)
    const r2 = Math.floor(Math.random() * 10)
    // 根据时间生成字符串
    const dateStr = dayjs().format('YYYYMMDDHHmmss')
    // 拼接生成OrderId
    const orderId = r1 + dateStr + r2
    // 订单创建日期
    const createDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
    // 过滤出购物车中未选中的商品
    userInfo.cartList = userInfo.cartList.filter((item ,index) => {
      return !item.checked
    })
    // 计算此时购物车剩下商品的总数
    let cartCount = 0
    userInfo.cartList.forEach((item, index) => {
      cartCount += item.productNum
    })
    // 订单信息
    let orderInfo = {
      orderId,
      createDate,
      orderAddress,
      orderProduct,
      orderPrice
    }
    // 插入订单信息
    userInfo.orderList.push(orderInfo)
    await userInfo.save()
    res.json({
      status: 0,
      msg: '创建订单成功',
      cartCount,
      data: orderInfo
    })
  },
  // 获取最新订单信息
  async orderInfoHandle (req, res, next) {
    // 查询当前用户信息
    let userInfo = await usersModel.findOne({ _id: req.tokenRes.id })
    let ordeList = userInfo.orderList
    // 订单为空
    if (!ordeList.length) {
      res.json({
        status: 1,
        msg: '该用户没有订单',
        data: {}
      })
      return
    }
    // 保存最新订单项
    let orderItem = ordeList[ordeList.length - 1]
    res.json({
      status: 0,
      msg: '获取订单信息成功',
      data: orderItem
    })
  }
}