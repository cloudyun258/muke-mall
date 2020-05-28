<template>
  <div class="nav-header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="container">
      <div class="left">
        <a href="/#/goods"><img src="../assets/images/logo1.png"></a>
      </div>
      <div class="right">
        <span class="username">{{ userName }}</span>
        <a href="javascript:;" class="logout" @click="logout" v-if="userName">Logout</a>
        <a href="javascript:;" class="login" @click="showLogin" v-if="!userName">Login</a>
        <div class="cart" @click="goCart">
          <span class="cart-num" v-if="userName">{{ cartCount }}</span>
          <span>
            <svg class="icon cart-icon">
              <use xlink:href="#icon-cart"></use>
            </svg>
          </span>
        </div>
      </div>
    </div>
    <model-frame :showModel="showModel" @closeframe="showModel=false">
      <template v-slot:content>
        <h3 class="title">{{ title }}</h3>
        <div class="error-wrap" v-show="errorFlag">
          <span class="spite spite-error"></span>
          <span class="error-msg">{{ errorMsg }}</span>
        </div>
        <div class="input-wrap">
          <div class="input username">
            <span class="spite spite-name"></span>
            <input type="text" placeholder="User Name" 
            v-model="username" @keydown.enter="toggleAction">
          </div>
          <div class="input username">
            <span class="spite spite-word"></span>
            <input type="password" placeholder="Password" 
            v-model="password" @keydown.enter="toggleAction">
          </div>
        </div>
        <div class="btnB">
          <button class="btnB-login" @click="toggleAction" v-show="toggleType">登 录</button>
          <button class="btnB-login" @click="toggleAction" v-show="!toggleType">立即注册</button>
        </div>
        <div class="register-img-wrap">
          <img src="../assets/images/zhinai_2.png" title="登录 / 注册切换" @click="toggle">
        </div>
      </template>
    </model-frame>
    <tip-frame 
      ref="tips" 
      :message="tipMsg" 
      :tipFlag="tipFlag"
      @showmsg="tipFlag=true"
      @hidemsg="tipFlag=false"
    >
    </tip-frame>
  </div>
</template>

<script>
  import ModelFrame from "@/components/ModelFrame"
  import TipFrame from "@/components/TipFrame"

  export default {
    name: 'NavHeader',
    data () {
      return {
        // 控制登录框得显示
        showModel: false,
        // 账号
        username: 'admin',
        // 密码
        password: 'admin123',
        // 错误提示信息
        errorMsg: '账号或密码错误',
        // 控制错误信息的显示
        errorFlag: false,
        // 消息内容
        tipMsg: '',
        // 控制消息框的显示
        tipFlag: false,
        // 登录注册框框标题
        title: 'Login in',
        // 登录注册的切换
        toggleType: true 
      }
    },
    computed: {
       // 使用 state 中的 username, 这里不直接写在data中是因为 axios请求需要时间
      userName () {
        return this.$store.state.username
      },
      // 使用 state 中的 cartCount
      cartCount () {
        return this.$store.state.cartCount
      }
    },
    methods: {
      // 显示登录框
      showLogin () {
        this.showModel = true
      },
      // 登录注册
      toggleAction () {
        const { username, password, toggleType } = this
        if (!username || !password) {
          this.errorMsg = '用户名或密码不能为空'
          this.errorFlag = true
          return
        }
        // 判断此时是出于登录还是注册
        const url = toggleType ? '/login' : '/register'
        this.axios.post(url, {
          username,
          password
        }).then(res => {
          // 用户名密码错误, 用户已存在
          if (res.status === 1) {
            this.errorFlag = true
            this.errorMsg = res.msg
          } else {
            this.errorFlag = false
            if (toggleType) {
              // 登录成功
              this.tipMsg = res.msg
              this.tipFlag = true
              this.showModel = false
              // 计算商品总数
              let cartCount = 0
              res.data.cartList.forEach(item => {
                cartCount += item.productNum 
              })
              // 保存用户名和购物车数量到vuex中
              this.$store.dispatch('saveUserName', res.data.userName)
              this.$store.dispatch('saveCartCount', cartCount)
              // 将 token写入localsotage
              localStorage.setItem('token', res.token)
            } else {
              // 注册成功
              this.toggleType = true
              this.title = 'Login in'
            }
          }
        }).catch(err => {})
      },
      // 登录注册切换
      toggle () {
        this.errorFlag = false
        this.toggleType = !this.toggleType
        this.title = this.toggleType ? 'Login in' : 'Register user'
      },
      // 退出登录
      logout () {
        this.tipMsg = '退出成功'
        this.tipFlag = true
        // 清除vuex中的数据
        this.$store.dispatch('saveUserName', '')
        this.$store.dispatch('saveCartCount', 0)
        // 移除token
        localStorage.removeItem('token')
      },
      // 跳转到购物车
      goCart () {
        this.$router.push('/cart')
      }
     },
    components: {
      ModelFrame,
      TipFrame
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"

  .nav-header
    background-color: $colorG
    font-size: $fontH
    .container
      flex-one()
      height: 70px 
      padding: 5px 20px 10px
      @media only screen and (max-width: 400px)
        flex-wrap: wrap
        height: auto
        justify-content: center  
      .left
        margin-left: -20px
        @media only screen and (max-width: 400px)
          margin-top: -20px
          margin-left: 40px  
      .right
        display: flex
        align-items: center 
        padding-top: 10px
        @media only screen and (max-width: 400px)
          padding-top: 0
          margin-top -15px
        > span, a
          padding-left: 15px
          color: $colorD
        .cart
          position: relative
          padding-left: 15px
          cursor: pointer
          .cart-num
            pos-base(absolute, auto, -9px, -11px, 20px, auto)
            background-color: #eb767d
            font-weight: 700
            text-align: center
            color: $colorG
            border-radius: 10px
            padding-left: 0     
          .cart-icon
            width: 25px
            height: 25px
            transform: scaleX(-1)
    .title
      position: absolute
      top: 14px 
      height: 24px
      line-height: 24px
      padding: 8px 0
      color: $colorE
      font-size: $fontG
      font-weight: 400
    .error-wrap
      position: relative
      padding: 0 0 7px 17px
      .spite-error
        position: absolute
        top: 6px
        left: 0 
        spite-icon(15px, 16px , $imgUrl + "icon.png", 0, -102px)
      .error-msg
        color: #d31723
        font-size: $fontJ
        font-weight: 200 
    .input-wrap
      .input
        position: relative
        border: 1px solid $colorH
        margin-bottom: 15px
        height: 40px
        line-height: 40px
        padding-left: 45px
        input
          width: 100%
          padding-right: 15px
          font-size: 15px 
      .spite
        position: absolute
        top: 10px
        left: 12px
        &.spite-name
          spite-icon(16px, 20px , $imgUrl + "icon.png", 0, 0)
        &.spite-word
          spite-icon(18px, 23px , $imgUrl + "icon.png", -201px, 0)
    .btnB
      margin-top: 30px 
      .btnB-login
        width: 100%
        height: 38px
        line-height: 38px
        background-color: #009de6
        color: $colorG
        font-size: $fontG
    .register-img-wrap
      pos-base(absolute, auto, auto, 5px, 46px, 62px)
      bottom: 5px
      cursor: pointer
      img
        width: 100%  

</style>