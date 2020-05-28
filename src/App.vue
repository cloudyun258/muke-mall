<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted () {
      // 如果没有token则不用获取用户信息
      if (!localStorage.getItem('token')) return
      this.getUserInfo()
    },
    methods: {
      getUserInfo () {
        this.axios.get('/userInfo').then(res => {
          if (res.status === 0) {
            // 计算商品总数
            let cartCount = 0
            res.data.cartList.forEach(item => {
              cartCount += item.productNum 
            })
            // 保存用户名和购物车数量到vuex中
            this.$store.dispatch('saveUserName', res.data.userName)
            this.$store.dispatch('saveCartCount', cartCount)
          }
        }).catch(err => {})
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
