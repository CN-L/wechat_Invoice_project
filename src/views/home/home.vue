<template>
    <div id="home">
      <van-swipe class="top-swiper" :autoplay="swiperTime" indicator-color="white">
          <van-swipe-item v-for="(item, index) in swiperList" :key="index">
            <img class="banner-img" :src="baseImgUrl + item.imageUrl" alt="">
          </van-swipe-item>
        </van-swipe>
      <!-- 首页四项主功能 -->
      <div class="home-center">
        <span class="mini-title home-center-text">待办流程</span>
        <div class="btn-four">
          <div class="btn-one-first">
            <!--申请开户-->
            <img class="btn-four-img" src="./accountApply.png" alt="" @click="takePageTap(1)">
            <img class="btn-four-img-center" src="./right.png" alt="">
           <!-- 查看开户进度-->
            <img class="btn-four-img" src="./accountSchedule.png" alt="" @click="takePageTap(2)">
          </div>
          <div class="btn-one-first">
            <!--申请开票-->
            <img class="btn-four-img" src="./invoiceApply.png" alt="" @click="takePageTap(3)">
            <img class="btn-four-img-center" src="./right.png" alt="">
            <!--查看开票进度-->
            <img class="btn-four-img" src="./invoiceSchedule.png" alt="" @click="takePageTap(4)">
          </div>
        </div>
      </div>
      <!--问答-->
      <div class="home-problem">
        <van-row type="flex" justify="center" align="center">
          <van-col span="4"></van-col>
          <van-col span="9">
            <p class="mini-title">税务常见问题</p>
          </van-col>
          <van-col span="7"><p @click="$router.push('/moreProblem')" class="my_color_blue">查看更多</p></van-col>
        </van-row>
        <van-collapse v-model="activeNames" v-for="(item, index) in requestionList" :key="index">
          <van-collapse-item :name="index + 1">
            <template #title>
              <div class="icon-list">
                <img class="icon-title" src="./requestion.png" alt="">{{item.problem}}
              </div>
            </template>
            <span v-html="item.answer"></span>
          </van-collapse-item>
        </van-collapse>
      </div>
      <van-dialog class="my_dialog" message-align="left" v-model="userPrivacy">
        <div class="myUserPrivacy">
          <div class="mini-title">{{title}}用户隐私条款</div>
          <div v-html="privacy"></div>
        </div>
      </van-dialog>
      <!--隐私政策-->
      <div class="user-privacy">
        <div @click="userPrivacy = true" class="privacyPolicy">
          <a class="my-a" href="javaScript:;">{{title}}用户隐私服务条款</a>
        </div>
      </div>
      <!-- 底部菜单栏-->
      <tab-bar/>
    </div>
</template>

<script>
import tabBar from '@/components/home/tabBar'
import { mapActions, mapState } from 'vuex'
import { apiSwiperList, apiRequestList } from '../../api/home'
// 以下数据暂用
import md5 from 'js-md5'
export default {
  name: 'home',
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      privacy: '<p>您的信任对我们非常重要，我们深知个人信息及公司信息对您的重要性，我们将按照法律法规要求，采取相应的安全保护措施，尽力保护您的个人信息安全可控。鉴于此，北京金财联合信息技术有限公司制定本《隐私政策》并提醒您：</p><p><br></p><p>本政策适用于我方平台提供的所有产品和服务。您访问我方平台，使用我方平台提供的服务，及未设独立隐私政策的我方平台小程序，及登录相关客户端，均适用本隐私政策。</p><p><br></p><p>一、我们如何收集和使用您的信息</p><p><br></p><p>您使用我们的特定产品和服务时，为满足向您提供产品和服务之目的，您需要在士力架小程序提供创建个人账号。创建账号时，您可能需要提供包括手机号码、公司名称、身份证号、银行账号、开户行信息以及第三方认证的实名截图。您提供的这些信息将仅用于平台使用。</p><p><br></p><p>二、我们如何保护您的个人信息安全</p><p><br></p><p>&nbsp;我们非常重视您个人信息及公司信息的安全，将努力采取理的安全措施（包括技术方面和管理方面）来保护您的个人信息，防止您的个人信息及公司信息被不当使用或未经授权的情况下被访问、公开披露、使用、修改、损坏、丢失或者泄露。</p><p><br></p><p>三、管理您的个人信息</p><p><br></p><p>&nbsp;&nbsp;&nbsp;我们按《中华人民共和国网络安全法》的要求，通过提供便捷的方法，让您可以访问、更正及删除自己的账户信息或使用我们的服务时您提供的其他个人信息。</p><p><br></p>',
      userPrivacy: false, //隐私政策
      baseImgUrl: process.env.VUE_APP_BASE_IMG, //图片地址前缀
      activeNames: ['1'],
      requestionList: [], //问答
      swiperList: [], //轮播图
      swiperTime: '' //轮播时间
    }
  },
  mounted() {
    this.handleTapLogin()
    this.handleTapClick()
    this.searchSwiper() //轮播图
    this.searchRequestion() //问答
  },
  computed: {
    ...mapState('home', ['token', 'userWxInfomation'])
  },
  methods: {
    ...mapActions('home', ['wxlogin', 'doLogin']),
    // 权限登陆
    handleTapLogin() {
      const _form = {
        username: 'appletuser',
        password: md5('abc123456'),
        code: 800820
      }
      this.doLogin(_form)
    },
    handleTapClick() {
      const url = window.location.href //地址
      const indexStatus = url.indexOf('?code') //是否存在
      let openid = ''
      if (this.userWxInfomation.openid) {
        openid = this.userWxInfomation.openid
      }
      const _form = {
        openid: openid,
        code: indexStatus == -1 ? '' : url.match(/code=(\S*)&/)[1]
      }
      // sessionStorage.setItem('code', _form.code) //存储
      this.wxlogin(_form)
    },
    /*主页四大功能跳转*/
    takePageTap(index) {
      if (!this.token) {
        this.$toast.fail('未验证信息，请刷新后重试')
        return false
      }
      switch (index) {
        case 1:
          this.$router.push('/accountApply/notesOnInvoicing')
          break
        case 2:
          this.$router.push('/accountProgress')
          break
        case 3:
          if (this.userWxInfomation.serviceEndTime == '' || this.userWxInfomation.serviceStartTime == '') {
            this.$toast.fail('未设置服务有效期')
            return false
          }
          this.$router.push('/openInvoice/openInvoiceNotice')
          break
        case 4:
          this.$router.push('/invoiceProgress')
      }
    },
    // 轮播图
    async searchSwiper() {
      const { data } = await apiSwiperList()
      if (data.code === 1020000 || data.code === 1040400) {
        const { intervalTime } = data.extendProps
        this.swiperTime = intervalTime //轮播时间
        this.swiperList = data.content || [] //所有图片
      } else {
        this.swiperList = []
      }
    },
    // 只查询第一页的五条
    async searchRequestion() {
      const _form = {
        page: 0,
        size: 5
      }
      const { data } = await apiRequestList(_form)
      if (data.code === 1020000 || data.code === 1040400) {
        this.requestionList = data.content.content
      } else {
        this.requestionList = []
      }
    }
  },
  components: {
    tabBar
  }
}
</script>

<style scoped lang="stylus">
  #home
    width 100%
    height 100%
    box-sizing border-box
    overflow-y auto
    padding-bottom 130px
    .my_dialog
      .myUserPrivacy
         width 100%
         box-sizing border-box
         height 300px
         overflow auto
         padding 10px
         .mini-title
           margin 10px
           text-align center
           font-weight 700
    .user-privacy
      box-sizing border-box
      position fixed
      bottom 60px
      display flex
      flex-direction column
      padding-top 10px
      align-items center
      width 100%
      background #fff
      height 50px
     .privacyPolicy
       color #409EFF
       height 20px
       line-height 20px
       width 160px
       text-align center
       border-bottom 1px solid #409EFF
       .my-a
        color #409EFF
       .my-a:active
        color blue
    .home-center
       width 100%
       height 220px
      .home-center-text //居中对齐
        display block
        height 50px
        text-align center
        line-height 50px
      .btn-four
        width 320px
        margin 0 auto
        .btn-one-first //每行按钮
          display flex
          justify-content space-around
          align-items center
          height 70px
          margin 10px auto
          width 100%
          .btn-four-img
            width 134px
            height 62px
          .btn-four-img-center
            width 15px
            height 30px
    .home-problem //问答模块
       background #ffff
       width 100%
       p
        text-align center
        margin 10px
       .icon-list
         display: flex
         justify-content flex-start
         align-items: center
         .icon-title
           margin-right 3px
           width: 20px
           height: 20px
</style>
