<template>
  <div class="cart">
    <!-- √ svg 小图标 -->
    <symbol id="icon-ok" viewBox="0 0 32 32">
      <title>ok</title>
      <path class="path1" d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"></path>
    </symbol>
    <!-- 垃圾桶 svg 小图标 -->
    <symbol id="icon-del" viewBox="0 0 32 32">
      <title>delete</title>
      <path class="path1"
        d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
      <path class="path2"
        d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
      <path class="path3"
        d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
      <path class="path4"
        d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
    </symbol>
    <nav-bread navname="My Cart"></nav-bread>
    <div class="container">
      <div class="title-wrap">
        <h2 class="title">MY CART</h2>
      </div>
      <div class="content-wrap" v-show="cartList.length > 0">
        <div class="content-top">
          <ul class="tab-wrap">
            <li class="tab tab-1">ITEMS</li>
            <li class="tab tab-2">PRICE</li>
            <li class="tab tab-3">QUANTITY</li>
            <li class="tab tab-4">SUBTOTAL</li>
            <li class="tab tab-5">EDIT</li>
          </ul>
        </div>
        <div class="content-pro">
          <ul class="item-pro-wrap">
            <li class="item-pro" v-for="(item, index) in cartList" :key="index">
              <div class="item-pro-1">
                <div class="checked">
                  <a href="javascript:;" :class="{'check-all':item.checked}" @click="cartEdit('check', item)">
                    <svg class="icon ok-icon">
                      <use xlink:href="#icon-ok"></use>
                    </svg>
                  </a>
                </div>
                <div class="pic">
                  <img v-lazy="item.productImage">
                </div>
                <div class="name">{{ item.productName }}</div>
              </div>
              <div class="item-pro-2">
                <div class="price">
                  <span>{{ item.salePrice | fmtMoney }}</span>
                </div>
              </div>
              <div class="item-pro-3">
                <div class="num-wrap">
                  <span class="num-btn num-down" @click="cartEdit('cut', item)">-</span>
                  <span class="num-input">{{ item.productNum }}</span>
                  <span class="num-btn num-up" @click="cartEdit('add', item)">+</span>
                </div>
              </div>
              <div class="item-pro-4">
                <div class="total">
                  <span class="total-price">{{ item.totalPrice | fmtMoney }}</span>
                </div>
              </div>
              <div class="item-pro-5">
                <a href="javascript:;" @click="openModel(item.productId)">
                  <svg class="icon del-icon">
                    <use xlink:href="#icon-del"></use>
                  </svg>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="content-page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="cartTotal"
            :page-size="pageSize"
            :current-page="page"
            @current-change="pageChange"
          >
          </el-pagination>
        </div>
        <div class="content-foot">
          <div class="select-all">
            <a href="javascript:;" :class="{'check-all':checkedAll}" @click="toggleCheckAll">
              <svg class="icon ok-icon">
                <use xlink:href="#icon-ok"></use>
              </svg>
            </a>
            <a class="all-txt" href="javascript:;">Select all</a> 
          </div>
          <div class="checkout">
            <div class="item-total">
              <span class="total-txt">Item total:</span>
              <span class="total-pro-price">{{ checkedTotalPrice | fmtMoney }}</span>
            </div>
            <div class="checkout-btn">
              <button class="btn solid" :class="{'btn-ban':checkedTotalPrice == 0}" @click="goAddress">CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data-wrap" v-show="cartList.length==0">
        <img src="../assets/images/icon-no-data.png">
        <p class="no-data-txt">购物车空空如也~</p>
      </div>
    </div>
    <model-frame :showModel="showModel" @closeframe="showModel=false">
      <template v-slot:content>
         <div class="tips">
          <span class="msg">确认要删除此商品？</span>
        </div>
        <div class="btn-wrap">
          <a href="javascript:;" class="btn empty" @click="cartDel">确认</a>
          <a href="javascript:;" class="btn solid" @click="showModel=false">取消</a>
        </div>
      </template>
    </model-frame>
  </div>
</template>

<script>
  import NavBread from "@/components/NavBread"
  import ModelFrame from "@/components/ModelFrame"

  export default {
    name: 'Cart',
    data () {
      return {
        // 购物车列表数据
        cartList: [],
        // 购物车商品总数量
        cartTotal: 20,
        // 每页显示的个数
        pageSize: 5,
        // 当前页数
        page: 1,
        // 控制删除模态框的显示
        showModel: false,
         // 购物车已选商品的总价
        checkedTotalPrice: 0,
         // 是否全选中
        checkedAll: true,
        // 要删除的商品Id
        proId: ''
      }
    },
    mounted () {
      this.getCartList()
    },
    methods: {
      // 获取购物车数据
      getCartList () {
        this.axios.get('/cartList', {
          params: {
            pageSize: this.pageSize,
            page: this.page
          }
        }).then(res => {
          if (res.status === 1) {
            // 显示消息框
            this.bus.$emit('showtip', {
              mode: 1,
              message: res.msg
            })
            this.$router.push('/goods')
            return
          }
          this.cartTotal = res.data.total
          this.cartList = res.data.cartList
          this.checkedTotalPrice = res.data.checkedTotalPrice
          this.checkedAll = res.data.checkedAll
        })
      },
      // 页数改变时触发
      pageChange (currentPage) {
        // 设置当前页并重新获取数据
        this.page = currentPage
        this.getCartList()
      },
      // 编辑商品
      cartEdit (type, product) {
        // 商品数量不能少于1件
        if (product.productNum == 1 && type === 'cut') {
          this.bus.$emit('showtip', {
            mode: 2,
            message: '商品不能少于1件'
          })
          return
        }
        this.axios.patch('/cartEdit', {
          editType: type,
          productId: product.productId
        }).then(res => {
          // 商品不存在或库存不足
          if (res.status === 1) {
            this.bus.$emit('showtip', {
              mode: 2,
              message: res.msg
            })
            return
          }
          // 更新vuex中购物车商品总数量
          this.$store.dispatch('saveCartCount', res.cartCount)
          this.getCartList()
        }).catch(err => {})
      },
      // 全选非全选切换
      toggleCheckAll () {
        this.axios.patch('/cartChecked', {
          checkedAllFlag: !this.checkedAll
        }).then(res => {
          // 设置成功重新拉取数据
          this.getCartList()
        }).catch(err => {})
      },
      // 打开删除提示框并记录要删除的商品Id
      openModel (productId) {
        this.showModel = true
        this.proId = productId
      },
      // 删除购物车商品
      cartDel () {
        this.axios.delete('/cartDel', {
          params: {
            productId: this.proId
          }
        }).then(res => {
          // 如果当前页不是第一页而且该页只有一条数据
          if (this.cartList.length == 1 && this.page > 1) {
            this.page --
          }
          // 更新vuex中购物车商品总数量
          this.$store.dispatch('saveCartCount', res.cartCount)
          this.showModel = false
          this.getCartList()
        }).catch(err => {})
      },
      // 跳转到地址列表
      goAddress () {
        if (this.checkedTotalPrice > 0) this.$router.push('/address')
      }
    },
    components: {
      NavBread,
      ModelFrame
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  
  .cart
    padding-bottom: 50px
    @media only screen and (max-width: 767px)
      padding-bottom: 0
      .container
          padding: 0
    .title-wrap
      .title
        padding: 40px 0 20px 0
        font-size: $fontE
        letter-spacing: .25em
        font-weight: 700
        color: $colorE
        @media only screen and (max-width: 991px)
          padding: 30px 0 20px 0
          font-size: $fontG
        @media only screen and (max-width: 767px)
          padding: 1.3rem 0
          font-size: 1.4rem
          border-bottom: 1px solid $colorL
          text-align: center
    
    .content-wrap
      .tab-1, .item-pro-1
        width: 42.22%
      .tab-2, .item-pro-2
        width: 11.55% 
      .tab-3, .item-pro-3
        width: 18.13%
      .tab-4, .item-pro-4 
        width: 18.19%
      .tab-5, .item-pro-5
        width: 9.87% 
      .content-top
        height: 40px
        line-height: 40px
        color: $colorG
        background-color: $colorD
        @media only screen and (max-width: 991px)
          display: none 
        .tab-wrap
          display: flex
          width: 100%  
          .tab
            font-family: moderat, sans-serif
            letter-spacing: .25em
            text-align: center
      .content-pro
        .item-pro-wrap
          width: 100%
          li
            position: relative
            display: flex
            width: 100%
            text-align: center
            padding: 32px 0
            background-color: $colorG
            border-bottom: 1px solid $colorL
            @media only screen and (max-width: 767px)
              flex-wrap: wrap
              padding: 0
              border-top: 1px solid $colorL
              margin-bottom: 10px
              &:last-child
                margin-bottom: 0 
          .item-pro-1
            display: flex 
            text-align: left
            @media only screen and (max-width: 767px)
              width: 100%
              padding-top: 18px
            .checked
              display: flex
              align-items: center
              padding-left: 20px  
              @media only screen and (max-width: 767px)
                padding-left: 10px 
              a
                display: inline-block
                width: 20px
                height: 20px
                line-height: 20px 
                background-color: $colorG
                border: 1px solid $colorF
                border-radius: 50%
                box-sizing: border-box
                text-align: center
                &.check-all
                  background-color: $colorB
                  border: none 
                .ok-icon
                  transform: scale(.8)
                  fill: $colorG
                  font-size: 14px 
            .pic
              width: 78px
              height: 78px
              border: 1px solid $colorL
              margin-left: 20px
              @media only screen and (max-width: 767px) 
                margin-left: 8px 
              img
                width: 100%
            .name
              display: flex
              align-items: center
              padding: 0 20px
              color: #000
              font-family: moderat,sans-serif
              font-weight: 700
              @media only screen and (max-width: 767px)
                padding: 0 15px
          .item-pro-2
            @media only screen and (max-width: 767px)
              display: none 
            .price
              flex-one(center)
              height: 100%
              font-size: $fontH
              color: $colorE
          .item-pro-3
            flex-one(center)
            @media only screen and (max-width: 767px)
              width: 50%
              margin-top: 10px
              padding: 8px 10px
              box-sizing: border-box
              justify-content: flex-start
              border-top: 1px solid #f0f0f0
            .num-wrap
              border: 1px solid #f0f0f0
              border-radius: 3px
              background-color: #f0f0f0
              .num-btn
                &:hover
                  color: $colorA
              .num-btn, .num-input
                display: inline-block
                width: 40px
                height: 28px
                line-height: 28px
                text-align: center
                background-color: #f0f0f0
                font-size: $fontH
                cursor: pointer
              .num-input          
               width: 30px
               background-color: $colorG
               padding: 0 3px
               box-sizing: border-box  
          .item-pro-4
             @media only screen and (max-width: 767px)
              width: 50%
              margin-top: 10px
              padding: 8px 0
              box-sizing: border-box
              border-top: 1px solid #f0f0f0
            .total
              flex-one(center)
              height: 100%
              font-size: $fontH
              color: $colorA
              @media only screen and (max-width: 767px)
                justify-content: flex-end
                padding-right: 10px 
          .item-pro-5
            flex-one(center)
            @media only screen and (max-width: 767px)
              position: absolute
              top: 60px
              right: 10px
              justify-content: flex-end
            .del-icon
              width: 20px
              height: 20px
              fill: $colorF
              &:hover
                fill: $colorA
      .content-page
        text-align: right
        margin-top: 20px
        margin-bottom: 50px
        >>> .el-pagination
          padding: 2px 0
          .btn-next
            margin-right: 0 
        @media only screen and (max-width: 767px)
          text-align: center
          margin-bottom: 40px  
      .content-foot
        flex-one()
        height: 56px 
        background-color: $colorG 
        font-size: $fontH
        border: 1px solid $colorL
        @media only screen and (max-width: 767px)
          pos-base(fixed, 0, auto, auto, 100%, 47px)
          bottom: 0 
        .select-all
          display: flex
          align-items: center
          padding-left: 20px
          @media only screen and (max-width: 767px)
            padding-left: 10px 
          a:first-child
            display: inline-block
            width: 20px
            height: 20px
            background-color: $colorG
            border: 1px solid $colorF
            border-radius: 50%
            box-sizing: border-box
            text-align: center
            font-size: $fontI
            &.check-all
              background-color: $colorB
              border: none 
            .ok-icon
              transform: scale(.8)
              fill: $colorG 
          .all-txt
            margin-left: 20px
            color: $colorD
            @media only screen and (max-width: 400px)
              font-size: $fontI
            @media only screen and (max-width: 320px)
              margin-left: 5px 
        .checkout
          flex-one()
          height: 100% 
          .item-total
            margin-right: 30px
            @media only screen and (max-width: 400px)
              margin-right: 10px 
            .total-txt
              margin-right: 10px
              color: $colorF
              @media only screen and (max-width: 414px)
                display: none  
            .total-pro-price
              color: $colorA
              font-weight: 700
              font-size: $fontG
              @media only screen and (max-width: 400px)
                font-size: $fontH
          .checkout-btn
            height: 100% 
            .btn
              height:100%
              padding: 0 10px
              &.btn-ban
                background-color: #f16f75
                border-color: #f16f75
                color: $colorG !important
              @media only screen and (max-width: 320px)
                padding: 0 5px
                font-size: $fontJ
    .no-data-wrap
      width: 25%
      margin: 20px auto
      text-align: center
      @media only screen and (max-width: 767px)
        width: 30%
       @media only screen and (max-width: 400px)
         width: 35% 
      img
        width: 100%
      .no-data-txt
        color: #ada9a5
        margin-top: 15px
        @media only screen and (max-width: 767px)
          font-size: $fontI
    .tips
      text-align: center
      margin-bottom: 70px
      @media only screen and (max-width: 767px)
        font-size: $fontJ
        margin-bottom: 50px 
      .msg
        font-weight: 200
        font-size: $fontI
     .btn-wrap
      .btn  
        width: 45%
        margin: 0 2.5%
        @media only screen and (max-width: 767px)
          font-size: $fontJ
 
</style>