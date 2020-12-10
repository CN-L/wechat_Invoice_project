<template>
    <div id="showInvoiceLast">
      <i class="my-icon my-icon-chenggong"></i>
      <p class="mini-title">您的开票申请已提交</p>
      <p>税务局将给法人电话发送验证码</p>
      <p>请法人注意接听电话哦~<i class="my-icon my-icon-dianhua"></i></p>
      <van-button round class="my_color_btn" @click="$router.push('/home')">返回首页</van-button>
    </div>
</template>

<script>
export default {
  name: 'showInvoiceLast',
  data() {
    return {}
  }
}
</script>

<style scoped lang="stylus">
#showInvoiceLast
   display flex
   flex-direction column
   height 100%
   margin-top -20px
   justify-content center
   align-items center
   p
     font-size 18px
     margin 20px
     .my-icon-dianhua
       color #14af5f
   .my-icon-chenggong
     color #14af5f
     font-size 40px
   .mini-title
     font-weight 700
</style>
