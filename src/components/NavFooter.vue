<template>
  <div class="nav-footer">
    <div class="container">
      <div class="left">
        <span class="region">Region</span>
        <select class="language">
          <option value="english">USA</option>
          <option value="china">China</option>
        </select>
      </div>
      <div class="right">
        <span class="copy">Copyright © 2017 IMooc All Rights Reserved.</span>
        <a href="javascript:;" class="about">About Us</a>
        <a href="javascript:;" class="term">Terms & Conditions</a>
        <a href="javascript:;" class="privacy">Privacy Policy</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavFooter'
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  
  .nav-footer
    margin-top: 50px
    .container
      border-top: 1px solid rgba(51, 51, 51, .15)
      padding: 0 36px
      color: $colorK
      height: 100px
      flex-one()
      @media only screen and (max-width: 767px)
        flex-wrap: wrap
        padding: 15px 0 20px
        height: auto 
      .left
        .language
          padding: 1.5px 0
          border: 1px solid rgb(169, 169, 169)
          font-size: 100% 
        @media only screen and (max-width: 767px)
          width: 100%
          text-align: center
      .right
        @media only screen and (max-width: 767px)
          width: 100% 
          text-align: center
          margin-top: 50px 
        a
          margin-left: 46px
          &:hover
            color: $colorK !important
          @media only screen and (max-width: 1440px)
            margin-left: 21px
          @media only screen and (max-width: 991px)
            font-size: $fontJ
            margin-left: 18px
          @media only screen and (max-width: 767px)
            display: block
            margin-top: 20px 
        .copy
          @media only screen and (max-width: 991px)
            font-size: $fontJ

</style>