<template>
    <div id="notesInvoice">
      <p class="mini-title notesInvoice-title">申请开户须知</p>
      <div class="notesInvoice-content">
        <p> 申请开户前，需要准备以下资料</p>
        <p>1. 法人姓名及身份证号</p>
        <p>2. 法人注册的银行卡账户及开户银行支行信息</p>
        <p>3. 法人身份证正反面照片(深色背景)</p>
        <p>4. 法人白底半身照</p>
        <p>5. 下载【登记注册身份验证】APP认证截图</p>
        <p>6. 微信关注江西省税务局公众号注册身份认证截图</p>
        <p>7. 默认注册地点在江西上饶</p>
        <p>8. 默认个体户名称：铅山+【法人名字】建筑服务部 <span class="my_color_grey">(如有特殊命名需求，请联系您的客服)</span></p>
        <p>9. 1%的增值税发票综合税费为2.6%（包含个税和附加税），3%的增值税发票综合税费为4.8%（包含个税和附加税）</p>
      </div>
      <!--按钮 跳转页面-->
      <van-button class="my_color_btn" round @click="$router.push({path: '/accountApply'})">我已了解</van-button>
    </div>
</template>

<script>
export default {
  name: 'notesOnInvoicing',
  data() {
    return {}
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      immediate: true,
      deep: true // 实现深度监听
    }
  }
}
</script>

<style scoped lang="stylus">
#notesInvoice
  width 100%
  height 100%
  .notesInvoice-title
    text-align center
    margin 20px 0 0 0
    font-weight 700
  .notesInvoice-content
    box-sizing border-box
    width 100%
    padding 20px
    p
      margin 0 0 20px 0
   .my_color_btn
     display block
     margin 0 auto
</style>
