<template>
  <div class="order-success">
    <diV class="container">
      <div class="title-wrap">
        <h2 class="title">CHECK OUT</h2>
      </div>
      <step-bar 
        :step="4"
        :stepText="['Confirm Address', 'View Your Order', 'Make Payment', 'Order Confirmation']"
      >
      </step-bar>
      <div class="content">
        <div class="img-wrap">
          <img src="../assets/images/ok-2.png">
        </div>
        <div class="tip-wrap">
          <p class="tip">Congratulations!</p>
          <p class="tip">Your order is under processing!</p>
        </div>
        <div class="order-wrap">
          <span class="order-info">Order ID：{{ orderId }}</span>
          <span class="order-info">Order total：{{ orderPrice | fmtMoney }}</span>
        </div>
        <div class="btn-wrap">
          <a href="/#/cart" class="btn empty">CART LIST</a>
          <a href="/#/goods" class="btn empty">GOODS LIST</a>
        </div>
      </div>
    </diV>
  </div>
</template>

<script>
  import StepBar from "@/components/StepBar"

  export default {
    name: 'OrderConfirm',
    data () {
      return {
        orderId: 'xxx',
        orderPrice: 0
      }
    },
    mounted () {
      this.getOrderInfo()
    },
    methods: {
      // 获取订单信息
      getOrderInfo () {
        this.axios.get('/orderInfo').then(res => {
          // 没找到该订单
          if (res.status == 1) {
            this.bus.$emit('showtip', {
              mode: 1,
              message: res.msg
            })
            return
          }
          this.orderId = res.data.orderId
          this.orderPrice = res.data.orderPrice
        }).catch(err => {})
      }
    },
    components: {
      StepBar
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"

  .order-success
    .container
      @media only screen and (max-width: 767px)
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
      .content
        padding: 80px 0 50px 0
        text-align: center
        @media only screen and (max-width: 767px)
          padding: 50px 0 30px 0
        .img-wrap
          height: 130px
          margin-bottom: 60px
          @media only screen and (max-width: 767px)
            height: 100px
            margin-bottom: 30px  
          img
            height: 100%
        .tip-wrap
          font-size: $fontG
          font-weight: 200
          margin-bottom: 20px
          color: $colorE
          @media only screen and (max-width: 767px)
            font-size: $fontH 
          .tip
            font-size: 1.25em
            margin: 0
        .order-wrap
          margin-bottom: 40px
          color: $colorF
          font-size: $fontG
          @media only screen and (max-width: 767px)
            font-size: $fontH  
          .order-info
            margin: 0 10px
            @media only screen and (max-width: 767px)
              display: inline-block
              width: 100% 
        .btn-wrap
          .btn
            padding: 0 50px
            margin: 0 20px
            @media only screen and (max-width: 600px)
              width: 60%
              margin-bottom : 20px
              padding: 0

</style>