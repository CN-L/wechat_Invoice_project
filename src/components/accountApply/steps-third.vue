<template>
  <div id="steps-third">
    <div class="steps-fixed">
      <p class="mini-title">只需三部轻松完成注册</p>
      <img class="steps-img" src="../../assets/images/accountApply/steps-three.png" alt="">
    </div>
    <div class="my_tips">
      <!--提示-->
      <div class="tips_text">
        <p style="font-weight: 700">已提交申请</p>
        <p>开户申请审核中，请耐心等待哦</p>
      </div>
      <!--个人信息提交提示-->
      <div class="tips_bottom">
        <i>个体户名称：</i>
        <p>{{form.businessName}}</p>
        <i>默认开票金额：500万</i>
        <van-button class="my_color_btn" @click="nextClickTap" round block>查看开户进度</van-button>
        <van-button class="my_color_btn" @click="$router.push('/home')" round block>返回首页</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'steps-third',
  props: {
    form: Object
  },
  data() {
    return {}
  },
  methods: {
    // 第三步
    nextClickTap() {
      this.$emit('nextSteps', 3)
    }
  }
}
</script>

<style scoped lang="stylus">
#steps-third
  width 100%
  height 100%
  box-sizing border-box
  overflow hidden
  .steps-fixed
    height 120px
    background #fff
    box-sizing border-box
    padding 20px 10px
    z-index 10
    width 100%
    .mini-title
      text-align center
      font-weight 700
    .steps-img
      display block
      text-align center
      margin 20px auto
      width 330px
      height 35px
  .my_tips
     height 630px
     width 100%
    .tips_text
      width 100%
      height 120px
      p
       text-align center
       margin 20px auto
    .tips_bottom
      width 100%
      box-sizing border-box
      background #ececec
      padding 20px
      height 100%
      i
       display block
       font-size 16px
       font-weight 700
      p
        display block
        margin 20px 0 30px 0
      .my_color_btn
        margin-top 40px
</style>
