<template>
  <div class="order-confirm">
     <nav-bread navname="Order Confirm"></nav-bread>
     <div class="container">
       <step-bar 
        :step="2"
        :stepText="['Confirm Address', 'View Your Order', 'Make Payment', 'Order Confirmation']"
       >
      </step-bar>
      <div class="title-wrap">
        <h2 class="title">ORDER CONTENT</h2>
      </div>
      <div class="content-wrap" v-if="checkedProduct.length">
        <div class="content-top">
          <ul class="tab-wrap">
            <li class="tab tab-1">ORDER CONTENTS</li>
            <li class="tab tab-2">PRICE</li>
            <li class="tab tab-3">QUANTITY</li>
            <li class="tab tab-4">SUBTOTAL</li>
          </ul>
        </div>
        <div class="content-pro">
          <ul class="item-pro-wrap">
            <li class="item-pro" v-for="(item, index) in checkedProduct" :key="index">
              <div class="item-pro-1">
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
                <span class="num">x{{ item.productNum }}</span>
                <span class="txt">In Stock</span>
              </div>
              <div class="item-pro-4">
                <div class="total">
                  <span class="total-price">{{ item.totalPrice | fmtMoney }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="content-info">
          <p class="info">
            <span class="txt">Item subtotal:</span>
            <span class="price">{{ checkedTotalPrice | fmtMoney }}</span>
          </p>
          <p class="info">
            <span class="txt">Shipping:</span>
            <span class="price">{{ 100 | fmtMoney }}</span>
          </p>
          <p class="info">
            <span class="txt">Discount:</span>
            <span class="price">{{ 200 | fmtMoney }}</span>
          </p>
          <p class="info">
            <span class="txt">Tax:</span>
            <span class="price">{{ 400 | fmtMoney }}</span>
          </p>
          <p class="info">
            <span class="txt">Order total:</span>
            <span class="price price-total">{{ checkedTotalPrice + 100 + 200 + 400 | fmtMoney }}</span>
          </p>
        </div>
        <div class="content-btn">
          <a href="/#/address" class="btn empty">PREVIOUS</a>
          <a class="btn solid" @click="createOrder">PROCEED TO PAYMENT</a>
        </div>
      </div>
      <div class="no-data-wrap" v-if="!checkedProduct.length">
        <img src="../assets/images/icon-no-data.png">
        <p class="no-data-txt">购物车没有选中的商品‍~(=・ω・=)</p>
      </div>
     </div>
  </div>
</template>

<script>
  import NavBread from "@/components/NavBread"
  import StepBar from "@/components/StepBar"

  export default {
    name: 'OrderConfirm',
    data () {
      return {
        checkedProduct: []
      }
    },
    mounted () {
      this.getCheckedProduct()
    },
    computed: {
      // 当前订单总价格
      checkedTotalPrice () {
        let total = 0
        this.checkedProduct.forEach((item, idnex) => {
          total += item.totalPrice
        })
        return total
      }
    },
    methods: {
      // 获取当前已选中的商品列表
      getCheckedProduct () {
        this.axios.get('/orderList').then(res => {
          this.checkedProduct = res.data
        }).catch(err => {})
      },
      // 生成订单
      createOrder () {
        this.axios.post('/orderSuccess').then(res => {
          // 更新购物车数量
          this.$store.dispatch('saveCartCount', res.cartCount)
          this.$router.push({
            name: 'orderSuccess',
            params: res.data
          })
        })
      }
    },
    components: {
      NavBread,
      StepBar
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  .order-confirm
    padding-bottom: 50px
    @media only screen and (max-width: 767px)
      padding-bottom: 0
      .container
        padding: 0
    .title-wrap
      .title
        padding: 20px 0 20px 0
        font-size: $fontH 
        letter-spacing: .25em
        font-weight: 700
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
        width: 52.12%
      .tab-2, .item-pro-2
        width: 15.88% 
      .tab-3, .item-pro-3
        width: 15.88% 
      .tab-4, .item-pro-4 
        width: 15.88% 
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
            flex-wrap: wrap
            @media only screen and (max-width: 767px)
              flex-wrap: nowrap
              justify-content: flex-start
              width: 50%
              padding: 8px 8px 8px 10px
              margin-top: 10px
              box-sizing: border-box
              border-top: 1px solid #f0f0f0  
            .num
              position: relative
              top: 10px
              width: 50px
              height: 30px
              line-height: 30px
              border-radius: 3px
              border: 1px solid #f0f0f0
              box-sizing: border-box
              @media only screen and (max-width: 767px)
                top: 0
            .txt
              width: 100%
              font-size: $fontJ
              color: $colorA
              @media only screen and (max-width: 767px)
                width: auto
                margin-left: 5px
                font-size: 1.2rem
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
      .content-info
        font-size: $fontG 
        text-align: right 
        margin-top: 40px
        @media only screen and (max-width: 767px)
          margin-top: 0
          padding: 20px 0
          padding-right: 10px
          font-size: $fontH
        @media only screen and (max-width: 414px)
          font-size: $fontI 
        .info
          margin: 12px 0 
          .txt
            color: $colorF
          .price
            display: inline-block
            width: 130px
            &.price-total
              font-weight: 700
              color: $colorA
              font-weight: 700
              font-size: $fontF 
              @media only screen and (max-width: 767px)
                font-size: $fontG 
              @media only screen and (max-width: 414px)
                font-size: $fontH     
      .content-btn
        display: flex
        justify-content: space-between
        margin-top: 50px
        @media only screen and (max-width: 767px)
          pos-base(fixed, 0, auto, 0, 100%, 50px)
          z-index: 990 
          bottom: 0
          margin: 0 
        .btn
          padding: 0 10px
          cursor: pointer
        .empty
          @media only screen and (max-width: 767px)
            display: none
        .solid
          @media only screen and (max-width: 767px)
            width: 100%
            height: 50px
            line-height: 50px
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
 
</style>