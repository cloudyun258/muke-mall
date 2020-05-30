<template>
  <div class="address">
    <!-- 垃圾桶 svg 小图标 -->
    <symbol id="icon-del" viewBox="0 0 32 32">
      <title>delete</title>
      <path class="path1"
        d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
      <path class="path2"
        d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
      <path class="path3"
        d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
      <path class="path4"
        d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
    </symbol>
    <!-- + svg 小图标 -->
    <symbol id="icon-add" viewBox="0 0 32 32">
      <title>add</title><path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z" class="path1"></path>
    </symbol>
    <nav-bread navname="Address"></nav-bread>
    <div class="container">
      <div class="address-title">
        <h2 class="title">CHECK OUT</h2>
      </div>
      <step-bar 
        :step="1"
        :stepText="['Confirm Address', 'View Your Order', 'Make Payment', 'Order Confirmation']"
       >
      </step-bar>
      <div class="shipping-address-wrap">
        <div class="shipping-title">
          <h2 class="title">SHIPPING ADDRESS</h2>
        </div>
        <div class="shipping-address">
          <ul class="address-wrap">
            <li class="address-item">
              <div class="name">Admin</div>
              <div class="postion">广东省阳江市阳西县溪头镇马村2队</div>
              <div class="phone">18218378767</div>
              <div class="default">Default address</div>
              <div class="del">
                <svg class="icon del-icon">
                  <use xlink:href="#icon-del"></use>
                </svg>
              </div>
            </li>
             <li class="address-item">
              <div class="name">Admin</div>
              <div class="postion">广东省阳江市阳西县溪头镇马村2队</div>
              <div class="phone">18218378767</div>
              <div class="default">Default address</div>
              <div class="del">
                <svg class="icon del-icon">
                  <use xlink:href="#icon-del"></use>
                </svg>
              </div>
            </li>
             <li class="address-item">
              <div class="name">Admin</div>
              <div class="postion">广东省阳江市阳西县溪头镇马村2队</div>
              <div class="phone">18218378767</div>
              <div class="default">Default address</div>
              <div class="del">
                <svg class="icon del-icon">
                  <use xlink:href="#icon-del"></use>
                </svg>
              </div>
            </li>
             <li class="address-item">
              <div class="name">Admin</div>
              <div class="postion">广东省阳江市阳西县溪头镇马村2队</div>
              <div class="phone">18218378767</div>
              <div class="default">Default address</div>
              <div class="del">
                <svg class="icon del-icon">
                  <use xlink:href="#icon-del"></use>
                </svg>
              </div>
            </li>
             <li class="address-item">
              <div class="name">Admin</div>
              <div class="postion">广东省阳江市阳西县溪头镇马村2队</div>
              <div class="phone">18218378767</div>
              <div class="default">Default address</div>
              <div class="del">
                <svg class="icon del-icon">
                  <use xlink:href="#icon-del"></use>
                </svg>
              </div>
            </li>
            <li class="address-item address-add">
              <div class="add">
                <svg class="icon add-icon">
                  <use xlink:href="#icon-add"></use>
                </svg>
              </div>
              <div class="add-txt">Add new address</div>
            </li>
          </ul>
          <div class="more">
            <span>more</span>
            <span class="arrow"></span>
          </div>
        </div>
      </div>
      <div class="shipping-methods-wrap">
        <div class="shipping-title">
          <h2 class="title">SHIPPING ADDRESS</h2>
        </div>
        <div class="shipping-methods">
          <ul class="methods-wrap">
            <li class="methods-item">
              <div class="method">Standard shipping</div>
              <div class="type">Free</div>
              <p class="desc">Once shipped，Order should arrive in the destination in 1-7 business days</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="next-btn">
        <button class="btn solid">NEXT</button>
      </div>
    </div>
   
  </div>
</template>

<script>
  import NavBread from "@/components/NavBread"
  import ModelFrame from "@/components/ModelFrame"
  import StepBar from "@/components/StepBar"

  export default {
    name: 'Address',
    components: {
      NavBread,
      ModelFrame,
      StepBar
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  
  .address
    overflow: hidden
    .container
      @media only screen and (max-width: 767px)
        padding: 0
      .title
        font-family: moderat, sans-serif
        padding: 20px 0
        font-size: 1.4rem
        border-bottom: 1px solid $colorL
        letter-spacing: .25em
        font-weight: 700
        color: $colorE
        @media only screen and (max-width: 767px)
          padding: 1.3rem 0
      .shipping-title
        .title
          color: $colorD
          font-size: $fontH
          border: none
        @media only screen and (max-width: 767px)
          font-size: 1.4rem
          text-align: center 
      .address-title
        display: none
        @media only screen and (max-width: 767px)
          display: block
          text-align: center
      .shipping-address-wrap
        .shipping-address
          .address-wrap
            display: flex
            flex-wrap: wrap
            @media only screen and (max-width: 767px)
              padding: 0 10px
            .address-item
              position: relative
              width: 23.809%
              box-sizing: border-box
              height: 162px
              margin: 0 1.587% 1.587% 0
              padding: 20px 20px 40px 20px
              cursor: pointer
              background-color: $colorG
              border: 2px solid $colorL
              &:hover
                border-color: $colorB
              &:nth-child(4n)
                margin-right: 0
              @media only screen and (max-width: 991px)
                width: 49%
                margin-right: 2%
                &:nth-child(2n)
                  margin-right: 0 
              @media only screen and (max-width: 767px)
                width: 100%
                margin-right: 0
              @media only screen and (max-width: 414px)
                transform: scale(.97) 
              .name
                font-weight: 700 
                margin-bottom: 10px
              .postion
                height: 45px 
              .phone
                margin-bottom: 10px
              .default
                color: $colorB
              .del
                pos-base(absolute, auto, auto, 20px, 18px, 18px)
                bottom: 18px
                .del-icon
                  width: 18px
                  height: 18px
                  &:hover
                    fill: $colorB
              &.address-add
                text-align: center
                .add
                  padding-top: 20px
                  padding-bottom: 10px
                  .add-icon
                    width: 50px
                    height: 50px
          .more
            text-align: center
            color: $colorB
            cursor: pointer
            margin-bottom: 10px 
            .arrow
              display: inline-block
              position: relative
              top: -3px
              width: 7px
              height: 7px  
              border-top: 1px solid $colorB
              border-left: 1px solid $colorB
              margin-left: 10px
              transform: rotate(-135deg)
      .shipping-methods-wrap
        @media only screen and (max-width: 767px)
          margin-bottom: 50px
        @media only screen and (max-width: 414px)
          margin-bottom: 30px 
        .shipping-methods
          .methods-wrap
            display: flex
            @media only screen and (max-width: 767px)
              padding: 0 10px
            .methods-item
              width: 23.809%
              box-sizing: border-box
              height: 162px
              margin: 0 1.587% 1.587% 0
              padding: 20px 20px 40px 20px
              cursor: pointer
              background-color: $colorG
              border: 2px solid $colorB
              &:nth-child(4n)
                margin-right: 0
              @media only screen and (max-width: 991px)
                width: 49%
                margin-right: 2%
                &:nth-child(2n)
                  margin-right: 0 
              @media only screen and (max-width: 767px)
                width: 100%
                margin-right: 0
              @media only screen and (max-width: 414px)
                transform: scale(.97) 
              .method
                margin-bottom: 5px
                font-size: $fontH  
              .type
                font-weight: 700
                color: $colorE
                font-size: $fontH
                margin-bottom: 24px
              .desc
                color: $colorF
      .next-btn
        margin-top: 30px
        margin-bottom: 50px  
        text-align: right
        .btn
          width: 200px
        @media only screen and (max-width: 767px)
          pos-base(fixed, 0, auto, 0, 100%, 50px)
          z-index: 990 
          bottom: 0
          margin: 0 
          .btn
            width: 100%
            height: 50px
            line-height: 50px  

</style>