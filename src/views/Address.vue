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
            <li 
              class="address-item"
              v-for="(item ,index) in renderAddress"
              :key="index"
              :class="{'default': item.isDefault}"
            >
              <div class="name">{{ item.userName }}</div>
              <div class="postion">{{ item.street }}</div>
              <div class="phone">{{ item.tel }}7</div>
              <div 
                class="is-default" 
                :class="{'default': item.isDefault}" 
                @click="setDefault(item.addressId)"
              >
                {{ item.isDefault ? "Default address" : "Set Default" }}
              </div>
              <div class="del" @click="openModel(item.addressId)">
                <svg class="icon del-icon">
                  <use xlink:href="#icon-del"></use>
                </svg>
              </div>
            </li>
            <li class="address-item address-add">
              <div class="add" @click="openAddModel">
                <svg class="icon add-icon">
                  <use xlink:href="#icon-add"></use>
                </svg>
              </div>
              <div class="add-txt">Add new address</div>
            </li>
          </ul>
          <div class="more" @click="moreAddress">
            <span>more</span>
            <span class="arrow" :class="{'more-active': addressFlag}"></span>
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
        <button 
          class="btn solid" 
          :class="{'btn-ban': addressList.length == 0}"
          @click="goOrderConfirm"
        >NEXT</button>
      </div>
    </div>
    <!-- 删除模态框 -->
    <model-frame :showModel="showModel" @closeframe="showModel=false">
      <template v-slot:content>
         <div class="tips">
          <span class="msg">确认要删除此地址？</span>
        </div>
        <div class="btn-wrap">
          <a href="javascript:;" class="btn empty" @click="addressDel">确认</a>
          <a href="javascript:;" class="btn solid" @click="showModel=false">取消</a>
        </div>
      </template>
    </model-frame>
    <!-- 添加模态框 -->
    <model-frame :showModel="showAddModel" @closeframe="showAddModel=false">
      <template v-slot:content>
        <div class="add-form-wrap">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="收件人姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="收货地址" prop="street">
              <el-input type="textarea" v-model="ruleForm.street"></el-input>
            </el-form-item>
            <el-form-item label="默认地址" prop="default">
              <el-switch v-model="ruleForm.default" :disabled="switchAble"></el-switch>
            </el-form-item>
            <div class="btn-wrap">
              <button class="btn empty" @click="submitForm">立即添加</button>
              <button class="btn solid" @click="showAddModel=false">取消</button>
            </div>
          </el-form>
         </div>
       </template>
    </model-frame>
  </div>
</template>

<script>
  import NavBread from "@/components/NavBread"
  import ModelFrame from "@/components/ModelFrame"
  import StepBar from "@/components/StepBar"

  export default {
    name: 'Address',
    data () {
      return {
        // 当前用户所有地址
        addressList: [],
        // 当前渲染出来的地址
        renderAddress: [],
        // 控制是否显示更多地址
        addressFlag: false,
        // 保存当前要删除地址的Id
        addressDelId: '',
        // 控制删除模态框的显示
        showModel: false,
        // 控制添加地址模态框的显示
        showAddModel: false,
        // 默认地址开关是否能选择
        switchAble: false,
        ruleForm: {
          name: '',
          default: true,
          phone: '',
          street: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入收件人姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }
          ],
          street: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.getAddressList()
    },
    watch: {
      // 关闭模态框时重置表单
      showAddModel (newVal) {
        if (!newVal) {
           this.$refs['ruleForm'].resetFields()
        }
      }
    },
    methods: {
      // 获取地址列表
      getAddressList () {
        this.axios.get('/addressList').then(res => {
          if (res.status === 1) {
            this.bus.$emit('showtip', {
              mode: 1,
              message: res.msg
            })
            this.$router.push('/goods')
            return
          }
          this.addressList = res.data
          // 如果当前是展开, 直接赋值
          if (this.addressFlag) {
            this.renderAddress = res.data
          } else {
            // 否则截取前三条数据
            this.cutAddress(3)
          }
        }).catch(err => {})
      },
      // 显示更多地址
      moreAddress () {
        if (!this.addressFlag) {
          // 显示所有地址
          this.renderAddress = this.addressList
          this.addressFlag = true
        } else {
          // 收起地址
          this.cutAddress(3)
          this.addressFlag = false
        }
      },
      // 设置默认地址
      setDefault (addressId) {
        this.axios.patch('/addressDefault', {
          addressId
        }).then(res => {
          this.getAddressList()
        }).catch(err => {})
      },
      // 截取地址列表数据
      cutAddress (num) {
        this.renderAddress = []
        this.addressList.forEach((item ,index) => {
          if (index < num) {
            this.renderAddress.push(item)
          }
        })
      },
      // 打开删除提示框
      openModel (id) {
        this.showModel = true
        this.addressDelId = id
      },
      // 删除地址
      addressDel () {
        this.axios.delete('/addressDel', {
          params: {
            addressId: this.addressDelId
          }
        }).then(res => {
          this.showModel = false
          this.getAddressList()
        }).catch(err => {})
      },
      // 验证表单
      submitForm () {
        this.$refs['ruleForm'].validate((valid) => {
          // 表单验证通过
          if (valid) {
            this.addAddress()
          } 
        })
      },
      // 添加地址
      addAddress () {
        if (this.addressList.length >= 7) {
          this.bus.$emit('showtip', {
            mode: 2,
            message: '最多添加7个地址'
          })
          return
        }
        this.axios.post('/addressAdd', {
          name: this.ruleForm.name,
          phone: this.ruleForm.phone,
          street: this.ruleForm.street,
          isDefault: this.ruleForm.default
        }).then(res => {
          console.log(res)
          this.showAddModel = false
          this.getAddressList()
        }).catch(res => {})
      },
      // 打开添加地址模态框
      openAddModel () {
        // 如果当前用户没有地址
        if (!this.addressList.length) {
          // 开关禁用
          this.switchAble = true
        } else {
          this.switchAble = false
        }
        this.showAddModel = true
      },
      // 跳转到订单确认页面
      goOrderConfirm () {
        if (this.addressList.length) this.$router.push('/orderConfirm')
      }
    },
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
              &.default
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
              .is-default
                color: $colorI
                &:hover
                  color: $colorB
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
              transition: all .2s ease-out 
              &.more-active
                transform: rotate(45deg)
                top: 3px
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
          &.btn-ban
            background-color: #f16f75
            border-color: #f16f75
            color: $colorG !important
        @media only screen and (max-width: 767px)
          pos-base(fixed, 0, auto, 0, 100%, 50px)
          z-index: 990 
          bottom: 0
          margin: 0 
          .btn
            width: 100%
            height: 50px
            line-height: 50px

    .tips
      text-align: center
      margin-bottom: 70px
      @media only screen and (max-width: 767px)
        font-size: $fontJ
        margin-bottom: 50px 
      .msg
        font-weight: 200
        font-size: $fontI
     .btn-wrap
      .btn  
        width: 45%
        margin: 0 2.5%
        @media only screen and (max-width: 767px)
          font-size: $fontJ
    .add-form-wrap
      .btn-wrap
        .btn  
          width: 45%
          margin: 0 5%
          &.solid
            margin-right: 0
          &.empty
            margin-left: 0 
          @media only screen and (max-width: 767px)
            font-size: $fontJ

</style>