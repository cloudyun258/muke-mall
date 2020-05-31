<template>
  <transition name="slide">
    <div class="model-frame" v-show="showModel">
      <symbol id="icon-close" viewBox="0 0 32 32">
        <title>add</title>
        <path class="path1"
          d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
      </symbol>
      <div class="model-mask" @click="closeFrame" v-show="showModel"></div>
      <transition name="fade">
        <div class="model-content" v-show="showModel">
          <slot name="content"></slot>
          <div class="close-btn" @click="closeFrame">
            <svg class="icon close-icon">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ModelFrame',
    props: ['showModel'],
    methods: {
      closeFrame () {
        this.$emit('closeframe')
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"

  .model-frame
    pos-base(fixed)
    z-index: 999 
    &.slide-enter, &.slide-leave-to
      top: -100%
    &.slide-leave-active
      transition: all .4s
    .model-mask
      pos-base(fixed)
      background-color: #000
      opacity: .5
    .model-content
      pos-base(fixed, 50%, 50%, auto, 535px, auto)
      background-color: $colorG
      transform: translate(-50%, -50%)
      padding: 60px 50px
      box-sizing: border-box
      @media only screen and (max-width: 767px)
        width: 400px 
        padding: 60px 30px
      @media only screen and (max-width: 400px)
        width: 300px
        padding: 40px 30px
      &.fade-enter, &.fade-leave-to
        opacity: 0
        transform: translate(-50%, -34%) 
      &.fade-enter-active
        transition: all .7s
      &.fade-leave-active
        transition: all .3s
      .close-btn
        pos-base(absolute, auto, 12px, 12px, 24px, 24px)
        transform: rotate(45deg)
        cursor: pointer
        transition: all .4s 
        &:hover
          transform: rotate(-45deg)
        .close-icon
          width: 20px 
          height: 20px
          fill: $colorH

</style>