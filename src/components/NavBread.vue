<template>
  <div class="nav-bread">
    <a href="/#/goods">Home /</a>
    <span class="current">{{ navname }}</span>
  </div>
</template>

<script>
  export default {
    name: 'NavBread',
    props: ['navname']
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"

  .nav-bread
    background-color: #f0f0f0
    height: 45px
    line-height: 45px 
    padding: 0 10px
    font-size: $fontI 
    .current
      color: $colorA
      margin-left: 14px 
 
</style>