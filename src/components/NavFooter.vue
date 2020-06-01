<template>
  <div class="nav-footer">
    <div class="container">
      <div class="left">
        <span class="region">Region</span>
        <select class="language">
          <option value="use">USA</option>
          <option value="china">China</option>
        </select>
      </div>
      <div class="right">
        <span class="copyright">Copyright © 2017 IMooc All Rights Reserved.</span>
        <a href="javascript:;" @click="showModel=true">About Us</a>
        <a href="javascript:;">Terms & Conditions</a>
        <a href="javascript:;">Privacy Policy</a>
      </div>
    </div>
    <model-frame :showModel="showModel" @closeframe="showModel=false">
      <template v-slot:content>
        <div class="about">
          <h3 class="title">关于本站</h3>
          <p class="intro">Muke-Mall是个人为了巩固和提升 Vue.js + Node.js 而开发的简易商城网站.</p>
        </div>
        <div class="skill">
          <h3 class="title">技术栈</h3>
          <p class="intro">前台使用 HTML / JAVASCRIPT / VUE</p>
          <P class="intro">后台使用 NODE / MONGOOSE / EXPRESS</P>
        </div>
        <div class="contact">
          <h3 class="title">联系我</h3>
          <p class="intro">QQ: 834584707</p>
          <p class="intro">weixin: a584787</p>
        </div>
        <div class="logo">
          <img src="../assets/images/zhinai.png">
        </div>
      </template>
    </model-frame>
  </div>
</template>

<script>
  import ModelFrame from "@/components/ModelFrame"

  export default {
    name: 'NavFooter',
    data () {
      return {
        showModel: false
      }
    },
    components: {
      ModelFrame
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"

  .nav-footer
    margin-top: 50px
    @media only screen and (max-width: 767px)
      margin-top: 0 
    .container
      flex-one()
      max-width: 1260px 
      padding: 0 30px
      height: 100px
      border-top: 1px solid rgba(51, 51, 51, .15)
      @media screen and (max-width: 767px)
        flex-wrap: wrap
        justify-content: center
        height: auto
        padding: 15px 0 20px 0 
      .left
        @media screen and (max-width: 767px)
          width: 100%
          text-align: center 
        .region
          color: $colorK
        .language
          padding: 2px 0
          font-size: 1.4rem 
      .right
        @media screen and (max-width: 767px)
          width: 100% 
          text-align: center
          margin-top: 50px 
        .copyright
          color: $colorK
          @media screen and (max-width: 991px)
            font-size: $fontJ 
        a
          color: $colorK
          margin-left: 43.5px
          @media only screen and (max-width: 1440px)
            margin-left: 21px 
          @media screen and (max-width: 991px)
            font-size: $fontJ
          @media screen and (max-width: 767px)
            display: block
            margin-top: 19.5px 
          &:hover
            color: $colorK !important
    .about, .skill, .contact
      margin-bottom: 20px 
    .title
      width: 40%
      font-size: $fontH  
      padding-bottom: 7px
      border-bottom 1px solid #009de6
      color: $colorE
    .intro
      padding-left: 16px
      font-size: 12px
    .logo
      pos-base(absolute, auto, auto, 10px, 100px, 100px) 
      bottom: 15px
      img
        width: 100%   

</style>