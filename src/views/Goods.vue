<template>
  <div class="goods">
    <symbol id="icon-arrow-short" viewBox="0 0 25 32">
      <title>arrow-short</title>
      <path d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z" class="path1"></path>
    </symbol>
    <symbol id="icon-status-ok" viewBox="0 0 32 32">
      <title>status-ok</title>
      <path d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z" class="path1"></path>
      <path d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z" class="path2"></path>
    </symbol>
    <nav-bread navname="Goods"></nav-bread>
    <div class="container">
      <div class="filter-nav">
        <span class="sortby">Sort by:</span>
        <a href="javascript:;" class="default">Default</a>
        <a href="javascript:;" @click="sortPrice">Price
          <svg class="icon arrow-short-icon" :class="{'sort-arrow': priceSort === -1}">
            <use xlink:href="#icon-arrow-short"></use>
          </svg>
        </a>
        <div class="filterby" @click="showFilter=true">FILTER BY</div>
      </div>
      <transition name="slide">
        <div class="filter-model" v-show="showFilter">
          <div class="model-mask" v-show="showFilter" @click="showFilter=false"></div>
          <transition name="fade">
            <div class="model-content" v-show="showFilter">
              <h2>PRICE:</h2>
              <ul>
                <li 
                  class="fil-range" 
                  v-for="(item, index) in filterRange" 
                  :key="index"
                  :class="{'active': priceRange === index }"
                  @click="priceFilter(index)"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </transition>
      <div class="product-wrap">
        <div class="left">
          <h2>PRICE:</h2>
          <ul>
            <li 
              class="fil-range" 
              v-for="(item, index) in filterRange" 
              :key="index"
              :class="{'active': priceRange === index }"
              @click="priceFilter(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="right">
          <ul class="pro-item-wrap clearfloat">
            <li class="pro-item" v-for="(item, index) in goodsList" :key="index">
              <div class="pic">
                <a href="javascript:;">
                  <img v-lazy="item.productImage">
                </a>
              </div>
              <div class="main">
                <div class="name">{{ item.productName }}</div>
                <div class="price">{{ item.salePrice | fmtMoney }}</div>
                <div class="btn-area">
                  <button class="btn empty add" @click="showModel=true">加入购物车</button>
                </div>
              </div>
            </li>
          </ul>
          <div class="loadmore"
            v-infinite-scroll="scrollMore" 
            infinite-scroll-disabled="busy" 
            infinite-scroll-distance="50"
          >
            <img v-show="loading" src="../assets/images/svg/loading-spinning-bubbles.svg">
          </div>
        </div>
      </div>
    </div>
    <model-frame :showModel="showModel" @closeframe="showModel=false">
      <template v-slot:content>
        <div class="tips">
          <svg class="icon ok-status-icon">
            <use xlink:href="#icon-status-ok"></use>
          </svg>
          <span class="msg">加入购物车成功！</span>
        </div>
        <div class="btn-wrap">
          <a href="javascript:;" class="btn empty continue" @click="showModel=false">继续购物</a>
          <a href="/#/cart" class="btn solid gocart">查看购物车</a>
        </div>
      </template>
    </model-frame>
  </div>
</template>

<script>
  import NavBread from "@/components/NavBread"
  import ModelFrame from "@/components/ModelFrame"
  import infiniteScroll from 'vue-infinite-scroll'

  export default {
    name: 'Goods',
    data () {
      return {
        // 控制过滤价格弹出框的显示
        showFilter: false,
        // 过滤区间
        filterRange: ['All', '0.00 - 100.00', '100.00 - 500.00', 
        '500.00 - 1000.00', '1000.00 - 5000.00'],
        // 控制价格区间的选中
        priceRange: 0,
        // 控制购物车提示框的显示
        showModel: false,
        // 商品数据
        goodsList: [],
        // 控制商品价格的升降序
        priceSort: 1,
        // 当前是第几页
        page: 1,
        // 每页商品条数
        pageSize: 8,
        // 是否触发滚动更多, false为可以触发
        busy: false,
        // 控制加载动画的显示
        loading: false
      }
    },
    created () {
      // 当窗口大于 768px 时隐藏过滤弹出框
      window.addEventListener('resize', this.scopeWidth)
      // 获取商品数据
      this.getGoodsList()
    },
    beforeDestroy () {
      // 组件销毁时移除事件
      window.removeEventListener('resize', this.scopeWidth)
    },
    methods: {
      // 判断浏览器窗口宽度
      scopeWidth () {
        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (width > 768 && this.showFilter) {
          this.showFilter = false
          return
        }
      },
      // 获取商品数据
      getGoodsList () {
        this.axios.get('/goodsList', {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            sort: this.priceSort,
            priceRange: this.priceRange
          }
        }).then(res => {
           // 如果是最后一页了，则将busy置为true
          if (res.data.data.length < this.pageSize) {
            this.busy = true
          } else {
            this.busy = false
          }
          // 关闭加载动画
          this.loading = false
          // 如果是第一页则直接赋值
          if (this.page === 1) {
            this.goodsList = res.data.data
          } else {
            // 不是第一页则拼接数组
            this.goodsList = this.goodsList.concat(res.data.data)
          }
        }).catch(err => {})
      },
      // 价格升降序排序
      sortPrice () {
        // 重置页数
        this.page = 1
        this.priceSort = this.priceSort === 1 ? -1 : 1
        // 重新拉取数据
        this.getGoodsList()
      },
      // 滚动加载触发函数
      scrollMore () {
        // 防止刚刷新页面请求第二页数据
        if (this.goodsList.length === 0) return
        // 获取下一页数据
        this.page ++
         // 发请求之前把 busy 置为true, 防止多次加载
        this.busy = true
        this.loading = true
        this.getGoodsList()
      },
      // 价格过滤
      priceFilter (index) {
        this.priceRange = index
        this.page = 1
        this.getGoodsList()
      }
    },
    directives: {
      infiniteScroll
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
  
  .goods
    .container
      @media only screen and (max-width: 767px)
        padding: 0 
    .filter-nav
      background-color: $colorG
      height: 55px
      line-height: 55px
      margin: 60px 0 30px 0
      padding: 0 20px
      text-align: right
      overflow: hidden
      font-size: $fontI 
      .filterby
        display: none
        letter-spacing: 3px
        font-size: $fontJ
        margin: 0 10px
        cursor: pointer
        &:hover
          color: $colorB 
      @media only screen and (max-width: 767px)
        margin: 0
        padding: 0 10px
        background-color: #f0f0f0
        border-top: 1px solid $colorL
        text-align: left
        .sortby
          display: none
        .filterby
          display: block
          float: right  
      a
        margin: 10px
        color: $colorD
        @media only screen and (max-width: 767px)
          font-size: 15px
        @media only screen and (max-width: 640px)
          font-size: $fontI 
        &:hover
          color: $colorB !important
        &.default
          color: $colorB 
      .arrow-short-icon
        width: 11px
        height: 11px
        transform: rotateX(180deg)
        &.sort-arrow
          transform: rotateX(0deg)
    .filter-model
      pos-base(fixed)
      z-index: 10 
      &.slide-enter, &.slide-leave-to
        left: -100%
      &.slide-leave-active
        transition: all .4s linear
      .model-mask
        pos-base(fixed)
        background-color: #000
        opacity: .5
        @media only screen and (min-width: 767px)
          display: none 
      .model-content
        pos-base(fixed, auto, 0, 0, 230px, 100%)
        background-color: $colorG
        &.fade-enter
          right: -160px
        &.fade-leave-to
          right: -230px
        &.fade-enter-active
          transition: all .3s linear
        &.fade-leave-active
          transition: all .4s linear
        h2
          background-color: #f0f0f0
          height: 55px
          line-height: 55px
          padding-left: 20px
          font-size: $fontI
          letter-spacing: 3.5px
          font-weight: 700
        li
          padding: 12px 10px 12px 15px
          border-bottom 1px solid $colorL
          padding-left: 15px
          font-size: $fontI
          cursor: pointer
          @media only screen and (max-width: 400px)
            font-size: 13px
          @media only screen and (max-width: 320px)
            font-size: $fontJ
          &.active
            border-left: 2px solid $colorB
            color: $colorB
            font-weight: 700
          &:hover
            border-left: 2px solid $colorB
            color: $colorB
    .product-wrap
      display: flex 
      .left
        width: 230px
        margin-right: 25px
        box-sizing: border-box  
        padding: 0 20px 0 20px
        @media only screen and (max-width: 767px)
          display: none 
        h2
          margin-bottom: 30px 
          font-size: $fontI
          letter-spacing: 3.5px
          font-weight: 700
        li
          height: 26px
          line-height: 26px 
          font-size: $fontI
          cursor: pointer
          margin: 20px 0 
          transition: all .3s 
          &.active
            border-left: 2px solid $colorB
            color: $colorB
            font-weight: 700
            padding-left: 15px
          &:hover
            border-left: 2px solid $colorB
            color: $colorB
            padding-left: 15px
      .right
        flex: 1 
        .loadmore
          width: 70px 
          height: 70px 
          margin: 40px auto 0 auto
          text-align: center
          @media only screen and (max-width: 767px)
            width: 60px 
            height: 60px
            margin-top: 0px
            margin-bottom: 10px 
          img
            width: 70px
            @media only screen and (max-width: 767px)
              width: 60px 
        .pro-item-wrap
          width: 100% 
          .pro-item
            float: left 
            width: 23.8%
            margin-right: 1.587%
            margin-bottom: 1.587%
            border: 2px solid $colorL
            background-color: $colorG 
            box-sizing: border-box
            transition: all .5s ease-out
            &:nth-child(4n)
              margin-right: 0
            &:hover
              border-color: #ee7a23
              transform: translateY(-5px)
              box-shadow: 0 0 10px $colorF
            @media only screen and (max-width: 991px)
              width: 32.275%
              &:nth-child(4n)
                margin-right: 1.587%
              &:nth-child(3n)
                margin-right: 0
            @media only screen and (max-width: 767px)
              width: 100%
              margin-right: 0
              margin-bottom: 10px
              padding: 10px
              border: none
              border-top: 1px solid $colorL
              border-bottom: 1px solid $colorL
              &:hover
                border-color: $colorL
                transform: translateY(0px)
                box-shadow: none 
            .pic
              @media only screen and (max-width: 767px)
                float: left
                width: 110px
                height: 110px
                border: 1px solid $colorL
              a
                display: block
                width: 100%
                height: 0
                padding-bottom: 100%
                img
                  width: 100% 
            .main
              padding: 20px 10px 10px 10px
              @media only screen and (max-width: 767px)
                padding: 0 0 0 125px
                font-size: 1.2rem 
              .name
                height: 4em
                line-height: 1.25em
                padding-bottom: 10px      
                font-family: moderat, sans-serif
                font-weight: 700
                box-sizing: border-box 
                @media only screen and (max-width: 991px)
                  font-size: 1.3rem
                @media only screen and (max-width: 767px)
                  height: auto
                  min-height: 50px 
              .price
                line-height: 30px
                color: $colorA 
                font-size: 1.25em
              .btn-area
                padding-top: 10px
                @media only screen and (max-width: 767px)
                  text-align: right
                  padding: 0 
                .add
                  width: 100%
                  @media only screen and (max-width: 991px)
                    font-size: $fontJ
                  @media only screen and (max-width: 767px)
                    height: 30px
                    line-height: 30px
                    letter-spacing: .1em
                    font-size: 1rem
                    width: 92px 
    .tips
      text-align: center
      margin-bottom: 70px
      @media only screen and (max-width: 767px)
        font-size: $fontJ
        margin-bottom: 50px 
      .ok-status-icon
        width: 20px
        height: 20px
        fill: $colorB
        margin-right: 15px
        vertical-align: middle
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