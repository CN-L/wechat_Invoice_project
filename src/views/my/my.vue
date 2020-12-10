<template>
 <div id="my">
   <div class="my-header">
     <!--头像-->
     <div class="header-tips">
       <div class="header-img">
         <img v-if="userWxInfomation.headimgurl" class="avator" :src="userWxInfomation.headimgurl" alt="">
       </div>
       <!--微信头像和会员信息-->
       <div class="my-information">
         <div class="information-one">
           <span class="info-name">{{userWxInfomation.nickname}}</span>
           <div class="info-member">{{userWxInfomation.productType | identity}}</div>
         </div>
         <div v-if="userWxInfomation.serviceEndTime">会员服务截止日期：{{userWxInfomation.serviceEndTime | data-string('YYYY年MM月DD日')}}</div>
       </div>
     </div>
   </div>
   <!--按钮-->
   <div class="common-btn">
     <div class="btn-one" @click="navTap(1)">
       <img src="./individual.png" alt="">
       <span>我的个体户</span>
     </div>
     <div class="btn-one" @click="navTap(2)">
       <img src="./invoice.png" alt="">
       <span>我的发票</span>
     </div>
   </div>
   <!-- 底部菜单栏-->
   <tab-bar/>
 </div>
</template>

<script>
import tabBar from '@/components/home/tabBar'
import { mapState } from 'vuex'
export default {
  name: 'my',
  components: {
    tabBar
  },
  data() {
    return {
      page: -1
    }
  },
  filters: {
    // 身份识别
    identity: (value) => {
      const identitys = ['游客', '体验卡会员', 'vip会员']
      return identitys[value]
    }
  },
  computed: {
    ...mapState('home', ['userWxInfomation'])
  },
  methods: {
    // 页面跳转
    navTap(index) {
      switch (index) {
        case 1:
          this.$router.push('/accountProgress')
          break
        case 2:
          this.$router.push('/invoiceProgress')
          break
      }
    }
  }
}
</script>

<style scoped lang="stylus">
#my
  box-sizing border-box
  overflow-y auto
  padding-bottom 70px
  height 100%
  width 100%
  .my-header
    box-sizing border-box
    display flex
    align-items center
    color #fff
    height 150px
    width 100%
    background url("./bgImg.png") no-repeat center top
    background-size 100% //背景图自适应缩放
    .header-tips
      display flex
      align-items center
      height 100px
      margin 0 auto
      .my-information
        margin 0 10px
        width 100%
        .header-img
          width 60px
        .information-one
           display flex
           margin-bottom 10px
           align-items center
          .info-name
            display inline-block
            white-space nowrap /*让文字不换行*/
            overflow hidden
            width 120px
            text-overflow ellipsis
          .info-member
            display inline-block
            margin-left 10px
            text-align center
            background #caac6e
            border-radius 10px
            width 115px
            height 20px
            line-height 20px
  .common-btn
    display flex
    height 100px
    width 100%
    margin-top 100px
    .btn-one
      font-size 20px
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      width 50%
      height 100%
      img
       height 64px
       width 64px
</style>
