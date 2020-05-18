<template>
  <div class="nav-bread">
    <div class="bread">
      <a href="/#/goods">Home /</a>
      <a href="javascript:;">{{ name }}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBread',
    props: ['name']
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  
  .nav-bread
    height: 45px
    line-height: 45px
    background-color: #f0f0f0
    font-size: $fontI 
    .bread
      padding: 0 10px
      a
        margin-right: 15px
        &:last-child
          color: $colorA
          cursor: text

</style>