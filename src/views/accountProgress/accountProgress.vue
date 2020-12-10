<template>
  <div id="accountProgress">
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" >
      <div class="progress_item" v-for="(item, index) in dataList" :key="index" @click="editTapClick( item.id, item.applyStatus, item.accountStatus)">
        <div class="item_top">
          <div class="item_top_left">{{item.businessName}}</div>
          <div class="item_top_center my_color_blue">
            <span v-if="item.applyStatus === 3 && item.accountStatus === 0">立即修改</span>
            <span v-if="item.applyStatus === 2 && item.accountStatus === 2">点击查看</span>
          </div>
          <div class="item_top_right">
            <!--已注销不能查看详情-->
            <!--item.applyStatus === 2 && item.accountStatus === 4-->
            <img src="../../assets/images/accountProgress/detail.png" alt="">
          </div>
        </div>
        <div class="item_center">
          <div v-if="item.applyStatus === 0 && item.accountStatus === 0">
            <img src="../../assets/images/accountProgress/icon1.png" alt="">
            <span class="my_color_blue">继续提交资料</span>
          </div>
          <div v-if="item.applyStatus === 1 && item.accountStatus === 0">
            <img src="../../assets/images/accountProgress/icon2.png" alt="">
            <span class="my_color_blue">审核中</span>
          </div>
          <div v-if="item.applyStatus === 2 && item.accountStatus === 1">
            <img src="../../assets/images/accountProgress/icon2.png" alt="">
            <span class="my_color_blue">审核通过</span>
          </div>
          <div style="-webkit-line-clamp: 2;" v-if="item.applyStatus === 3 && item.accountStatus === 0">
            <img src="../../assets/images/accountProgress/icon3.png" alt="">
            <span class="my_color_red">审核驳回：{{item.remark}}</span>
          </div>
          <div v-if="item.applyStatus === 2 && item.accountStatus === 2">
            <img src="../../assets/images/accountProgress/icon4.png" alt="">
            <span class="my_color_blue">营业执照已生成</span>
          </div>
          <div v-if="item.applyStatus === 2 && item.accountStatus === 4">
            <img src="../../assets/images/accountProgress/icon5.png" alt="">
            <span class="my_color_grey">账户已注销</span>
          </div>
          <div v-if="item.applyStatus === 1 && item.accountStatus === 3">
            <img src="../../assets/images/accountProgress/icon5.png" alt="">
            <span class="my_color_grey">账户申请注销</span>
          </div>
          <div v-if="item.applyStatus === 2 && item.accountStatus === 3">
            <img src="../../assets/images/accountProgress/icon5.png" alt="">
            <span class="my_color_grey">待注销</span>
          </div>
          <div v-if="item.applyStatus === 3 && item.accountStatus === 3" class="my_color_blue">
            <img src="../../assets/images/accountProgress/icon3.png" alt="">
            <span class="my_color_red">账户申请注销 已驳回:{{item.remark}}</span>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { apiProgressList } from '../../api/accountProgress'
import { mapState } from 'vuex'
export default {
  name: 'accountProgress',
  data() {
    return {
      dataList: [],
      // 分页使用
      informationForm: {
        size: 10,
        page: 0
      },
      //  以下皆是下拉和上拉用到的
      rowForm: {} //这次请求的数据*/
    }
  },
  mounted() {
  },
  computed: {
    ...mapState('home', ['userWxInfomation'])
  },
  methods: {
    // 刷新
    refresh(done) {
      setTimeout(() => {
        this.dataList = []
        this.informationForm.page = 0
        //下拉刷新可重新使用
        this.$refs.my_scroller.finishInfinite(false)
        done()
      }, 20)
    },
    // 下拉加载更多
    infinite(done) {
      if (this.dataList.length >= this.rowForm.totalElements) {
        // 上拉获取数据回调函数停止使用 无更多数据 不再显示loading
        this.$refs.my_scroller.finishInfinite(true)
        return false
      }
      //表单
      const _form = {
        ...this.informationForm,
        id: this.userWxInfomation.id
      }
      apiProgressList(_form).then((res) => {
        const data = res.data
        if (data.code === 1020000 || data.code === 1040400) {
          if (this.informationForm.page == 0) {
            setTimeout(() => {
              const $scroller = this.$refs.my_scroller // 给你的scroller加个ref，获取一下
              $scroller.scrollTo(0, 0, true)
            }, 200)
          }
          this.rowForm = data.content
          this.dataList = this.dataList.concat(data.content.content)
          this.informationForm.page = this.informationForm.page + 1
          done()
        }
      })
    },
    // //继续提交表单
    // continueSubmit(id) {
    //   this.$router.push({ path: '/accountApply', query: { status: 1, id: id } }) //补充表单提交
    // },
    // 立即修改/立即查看
    editTapClick(id, applyStatus, accountStatus) {
      if (applyStatus === 0 && accountStatus === 0) {
        this.$router.push({ path: '/accountApply', query: { status: 1, id: id } }) //补充表单提交
        return false
      }
      // let signType = ''
      // let different = '' //营业执照已生成
      // if (applyStatus === 3 && accountStatus === 0) {
      //   signType = '修改'
      //   different = '未生成'
      // } else if (applyStatus === 2 && accountStatus === 2) {
      //   signType = '查看'
      //   different = '已生成'
      // } else {
      //   signType = '查看'
      //   different = '未生成'
      // }
      this.$router.push({ path: '/accountProgressDetail', query: { id: id } })

      // this.$router.push({ path: '/accountProgressDetail', query: { id: id, signType: signType, different: different } })
    }
  }
}
</script>

<style scoped lang="stylus">
#accountProgress
  width 100%
  height 100%
  /*padding-bottom 10px*/
  box-sizing border-box
  .progress_item
    display flex
    /*align-items center*/
    flex-direction column
    justify-content center
    min-height 100px
    width 350px
    box-sizing border-box
    padding 5px
    border-radius 10px
    margin 10px auto 0 auto
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    .item_top
      display flex
      align-items center
      width 100%
      .item_top_left
        width 200px
        font-size 16px
        font-weight 700
        height 20px
        overflow: hihdden;
        text-overflow ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
        white-space nowrap; /*让文字不换行*/
        overflow hidden; /*超出要隐藏*/
      .item_top_center
         width 100px
         text-align center
      .item_top_right
         width 40px
         img
          display block
          margin 0 auto
          height 13px
          width 7px
    .item_center
      margin-top 10px
      width 100%
      div
        display flex
        align-items center
        img
          display inline-block
          width 30px
          height 30px
        span
          display block
          width 100%
          margin 0 10px
</style>
