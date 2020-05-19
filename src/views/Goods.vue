<template>
  <div class="goods">
    <nav-bread name="Goods"></nav-bread>
    <symbol id="icon-arrow-short" viewBox="0 0 25 32">
      <title>arrow-short</title>
      <path d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z" class="path1"></path>
    </symbol>
    <div class="container">
      <div class="filter-nav">
        <span class="sortby">Sort by:</span>
        <a href="javascript:;" class="default">Default</a>
        <a href="javascript:;" class="price">
          Price
          <svg class="icon icon-arrow-short">
            <use xlink:href="#icon-arrow-short"></use>
          </svg>
        </a>
        <a href="javascript:;" class="filter">FILTER BY</a>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBread from '@/components/NavBread'

  export default {
    name: 'Goods',
    components: {
      NavBread
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  
  .goods
    .container
      height: 300px
      @media only screen and (max-width: 767px)
        padding: 0 
      .filter-nav
        height: 55px
        line-height: 55px
        background-color: $colorG
        margin: 60px 0 30px 0
        padding: 0 20px 
        text-align: right
        @media only screen and (max-width: 767px)
          margin: 0
          padding: 0 10px
          background: #f0f0f0
          border-top: 1px solid #e9e9e9
          text-align: left
          .sortby
            display: none
          .filter
            display: block !important
            float: right   
        a
          margin: 0 10px
          color: $colorD
          @media only screen and (max-width: 767px)
            font-size: 1.2rem 
          &.default
            color: $colorB
          &.filter
            display: none
            letter-spacing: .25em
            font-size: $fontJ
        .icon-arrow-short
          width: 11px
          height: 11px  


</style>