<template>
    <div id="openInvoiceNotice">
      <p class="mini-title notesInvoice-title">申请开票须知</p>
      <div class="openInvoiceNotice_top">
        <p>申请开票前，需要准备以下材料：</p>
        <p>1.受票方与个体户的合同图片</p>
        <p>2.税费打款凭证图片（必填）</p>
      </div>
      <div class="openInvoiceNotice_content">
        <span>开票税费支付账户</span>
        <span>账户名称：铅山县士力架建筑服务经营部</span>
        <span>开户银行：江西铅山农村商业银行股份有限公司福惠支行</span>
        <span>银行账户：163129168001012468</span>
        <span>开户行行号：402433500100</span>
        <span>电话：<a href="tel:0793-7962517">0090-7962517</a></span>
      </div>
      <div class="openInvoiceNotice_top">
        <p>3.给个体户的打款凭证（非必填）</p>
        <p>4.申请成功后，税务局将给法人发送验证码，请注意接听电话</p>
      </div>
      <van-button class="my_color_btn" @click="$router.push('/openInvoice')" round>我已经了解</van-button>
    </div>
</template>

<script>
export default {
  name: 'openAccountNotice'
}
</script>

<style scoped lang="stylus">
#openInvoiceNotice
  width 100%
  height 100%
  box-sizing border-box
  padding 20px
  .notesInvoice-title
    text-align center
    font-weight 700
  .openInvoiceNotice_top
    width 100%
    margin 0 auto
    p
     margin-top 20px
  .openInvoiceNotice_content
    width 100%
    padding 20px 10px
    box-sizing border-box
    margin 20px auto
    background #E4E7ED
    span
      display block
      margin-top 10px
  .my_color_btn
    margin 20px auto
</style>
