<template>
  <transition name="slidefade">
    <div class="tip-frame" 
      :class="{'success': mode === 0, 
      'error': mode === 1, 
      'warning' : mode === 2}"
      v-show="tipFlag"
    >
      <svg class="icon" aria-hidden="true" v-if="mode === 2">
        <use xlink:href="#icon-icon-test"></use>
      </svg>
       <svg class="icon" aria-hidden="true" v-if="mode === 1">
        <use xlink:href="#icon-icon-test1"></use>
      </svg>
       <svg class="icon" aria-hidden="true" v-if="mode === 0">
        <use xlink:href="#icon-icon-test2"></use>
      </svg>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script>
  import iconjs from '@/assets/javascript/iconfont'

  export default {
    name: 'TipFrame',
    props: {
      // 消息类型, 0为成功, 1为错误, 2为警告
      mode: {
        type: Number,
        default: 0
      },
      // 消息内容
      message: {
        type: String,
        default: '这是一条消息'
      },
      // 消息框显示的时间
      duration: {
        type: Number,
        default: 3000
      },
      // 控制消息框的显示
      tipFlag: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      // 当 tipFlag 变为true时, 规定时间内自动隐藏
      tipFlag (newVal) {
        if (newVal) {
          setTimeout(() => {
            this.hide()
          }, this.duration)
        }
      }
    },
    methods: {
      show () {
        this.$emit('showmsg', true)
      },
      hide () {
        this.$emit('hidemsg', false)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  
  .tip-frame
    pos-base(fixed, 50%, 50px, auto, auto, 35px)
    line-height: 35px
    transform: translateX(-50%)
    padding: 0 35px
    font-size: $fontI
    white-space: nowrap 
    z-index: 995
    @media only screen and (max-width: 767px)
      padding: 0 25px
    @media only screen and (max-width: 400px)
      transform: translateX(-50%) scale(.8)
    &.slidefade-enter
      top: -40%
      opacity: 1 
    &.slidefade-leave-to
      opacity: 0
    &.slidefade-enter-active
      transition: all 1s ease-out
    &.slidefade-leave-active
       transition: all .7s ease-out
    &.success
      background-color: rgba(240, 249, 235, .7)
      color: rgba(103, 194, 58, .8)
    &.error
      background-color: rgba(254, 240, 240, .7)
      color: rgba(245, 108, 108, .8)
    &.warning
      background-color: rgba(250, 236, 216, .7)
      color: rgba(230, 162, 60, .8) 
    .icon
      position: relative
      top: -1px
      margin-right: 10px
      font-size: $fontG
      vertical-align: middle

</style>