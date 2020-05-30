<template>
  <div class="step-bar">
    <ul class="step-wrap">
      <li 
        class="step-item" 
        v-for="(item, index) in stepText" 
        :key="index"
        :class="{'current': index <= step - 1}"
      >
        <span class="txt">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'StepBar',
    props: {
      // 当前处于第几步
      step: {
        type: Number,
        default: 1
      },
      // 每一步的文本，有几步是根据数组长度生成的
      stepText: {
        type: Array,
        default () {
          return ['ONE', 'TWO', 'THREE']
        },
        // 传过来的数组长度只能是 3-5
        validator (value) {
          return value.length >= 3 && value.length <= 5  
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  
  .step-bar
    .step-wrap
      display: flex 
      width: 100%
      padding: 30px 0 20px 0
      @media only screen and (max-width: 414px)
        padding: 20px 0 15px 0
      .step-item
        flex: 1
        position: relative
        padding: 0 1em 1.25em 1em
        border-bottom: 2px solid $colorH
        text-align: center
        color: $colorF
        font-size: $fontI 
        @media only screen and (max-width: 414px)
          font-size: $fontJ
          padding: 0 .5em 1em .5em 
        .txt
          font-weight: 700
        &.current
          color: $colorA
          border-color: $colorA
          &:before
            background-color: $colorA
        &:before
          content: ''
          pos-base(absolute, 50%, auto, auto, 14px, 14px) 
          bottom: 0
          border-radius: 50%
          background-color: $colorH
          transform: translate3d(-50%, 50%, 0) 
      
</style>