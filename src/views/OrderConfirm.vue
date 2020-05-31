<template>
  <div class="order-confirm">
     <nav-bread navname="Order Confirm"></nav-bread>
     <div class="container">
       <step-bar 
        :step="2"
        :stepText="['Confirm Address', 'View Your Order', 'Make Payment', 'Order Confirmation']"
       >
      </step-bar>
     </div>
  </div>
</template>

<script>
  import NavBread from "@/components/NavBread"
  import StepBar from "@/components/StepBar"

  export default {
    name: 'OrderConfirm',
    components: {
      NavBread,
      StepBar
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/mixins.styl"
  

</style>