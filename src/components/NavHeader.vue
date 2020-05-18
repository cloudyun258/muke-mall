<template>
  <div class="nav-header">
    <!-- 购物车 svg 小图标 -->
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="container">
      <div class="left">
        <a href="/#/goods"><img src="../assets/images/logo1.png" alt=""></a>
      </div>
      <div class="right">
        <span class="username">admin</span>
        <a href="javascript:;" class="logout">Logout</a>
        <a href="javascript:;" class="login" v-if="false">Login</a>
        <a href="javascript:;" class="icon-cart">
          <svg class="icon icon-cart">
            <use xlink:href="#icon-cart"></use>
          </svg>
        </a>
        <span class="cart-num">6</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavHeader'
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  
  .nav-header
    font-size: $fontH 
    background-color: $colorG
    .container
      flex-one()
      padding: 5px 20px 10px 20px
      height: 70px
      @media only screen and (max-width: 400px)
        height: auto
        flex-wrap: wrap
        justify-content: center
      .left
        margin-left: -20px
        @media only screen and (max-width: 400px)
          margin-left: 25px
          margin-top: -15px 
      .right
        position: relative 
        padding-top: 10px
        @media only screen and (max-width: 400px)
          padding: 0
          margin-top: -10px 
        a, span
          padding-left: 15px
          color: $colorD
          vertical-align: middle
        .icon-cart
          position: relative
          z-index: 1 
          width: 25px
          height: 25px
          transform: scaleX(-1)
        .cart-num
          position: absolute
          top: 1px
          right: -11px
          border-radius: 10px
          background-color: #eb767d
          width: 20px
          font-weight: 700
          color: $colorG
          text-align: center
          padding-left: 0
          @media only screen and (max-width: 400px)
            top: -9px

</style>