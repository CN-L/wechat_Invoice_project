<template>
    <div id="invoiceProgress">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" >
        <div class="invoice_list" v-for="(item, index) in dataList" :key="index" @click="editTapClick(item, 1)">
          <div class="item_top">
            <div class="item_top_left">{{item.drawerName}}</div>
            <div class="item_top_center my_color_blue">
              <span v-if="item.invoiceStatus === 4">立即修改</span>
            </div>
            <div class="item_top_right">
              <img src="../../assets/images/accountProgress/detail.png" alt="">
            </div>
          </div>
          <p>开票金额：{{item.invoiceAmount}}元</p>
          <div class="item_center">
            <!--审核通过-->
            <div v-if="item.invoiceStatus === 2">
              <img src="../../assets/images/accountProgress/icon7.png" alt="">
              <span class="my_color_blue">审核已通过：3~5个工作日内生成电子发票</span>
            </div>
            <div v-if="item.invoiceStatus === 2">
              <img src="../../assets/images/accountProgress/icon6.png" alt="">
              <span>请法人在此期间注意接听电话哦</span>
            </div>
            <!--审核中-->
            <div v-if="item.invoiceStatus === 0 || item.invoiceStatus === 1">
              <img src="../../assets/images/accountProgress/icon2.png" alt="">
              <span>审核中</span>
            </div>
            <!--电子发票已生成-->
            <div v-if="item.invoiceStatus === 3" @click.stop="seeElectronicInvoice(item)">
              <img src="../../assets/images/accountProgress/icon7.png" alt="">
              <span class="my_color_blue">下载电子发票</span>
            </div>
            <!--审核未通过-->
            <div v-if="item.invoiceStatus === 4">
              <img src="../../assets/images/accountProgress/icon3.png" alt="">
              <span class="my_color_red">审核未通过:{{item.remark}}</span>
            </div>
          </div>
          <!--未上传打款凭证（给个人）-->
          <div class="item_center" @click.stop="editTapClick(item, 2)" v-if="item.moneyCertificatesPerson === ''">
            <span class="my_color_blue">待上传打款凭证</span>
          </div>
        </div>
      </scroller>
      <van-dialog class="my_dialog2" v-model="dialog" title='查看电子发票'>
        <img :src="baseImgUrl + imageInvoice" />
        <van-button round class="my_color_btn">长按上方保存电子发票</van-button>
      </van-dialog>
    </div>
</template>

<script>
import { apiSearchInvoiceProgress } from '../../api/invoiceProgress'
import { divisionCom } from '../../filters'
import { mapState } from 'vuex'
export default {
  name: 'invoiceProgress',
  data() {
    return {
      page: 0,
      size: 10,
      imageInvoice: '',
      baseImgUrl: process.env.VUE_APP_BASE_IMG, //图片回显地址前缀
      dialog: false, //电子发票
      rowForm: {}, //此次请求出的数据
      dataList: [] //渲染列表
    }
  },
  computed: {
    ...mapState('home', ['userWxInfomation'])
  },
  methods: {
    //电子发票
    seeElectronicInvoice(item) {
      this.dialog = true
      this.imageInvoice = item.imageInvoice
    },
    // 刷新
    refresh(done) {
      setTimeout(() => {
        this.dataList = []
        this.page = 0
        //下拉刷新可重新使用
        this.$refs.my_scroller.finishInfinite(false)
        done()
      }, 20)
    },
    // 除法计算
    divisionCom(value) {
      return divisionCom(value)
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
        page: this.page,
        size: this.size,
        userid: this.userWxInfomation.id
      }
      apiSearchInvoiceProgress(_form).then((res) => {
        const data = res.data
        if (data.code === 1020000 || data.code === 1040400) {
          if (this.page == 0) {
            setTimeout(() => {
              const $scroller = this.$refs.my_scroller // 给你的scroller加个ref，获取一下
              $scroller.scrollTo(0, 0, true)
            }, 200)
          }
          this.rowForm = data.content
          this.dataList = this.dataList.concat(data.content.content)
          this.page = this.page + 1
          done()
        }
      })
    },
    editTapClick(info, index) {
      const { invoiceStatus } = info
      let seeTitle = ''
      if (index === 1) {
        switch (invoiceStatus) {
          case 0:
            seeTitle = '查看'
            break
          case 1:
            seeTitle = '查看'
            break
          case 2:
            seeTitle = '查看'
            break
          case 3:
            seeTitle = '查看'
            break
          case 4:
            seeTitle = '修改'
        }
      }
      if (index === 2) {
        seeTitle = '打款凭证'
      }
      this.$router.push({ path: '/openInvoice', query: { id: info.id, seeTitle: seeTitle } })
    }
  }
}
</script>

<style scoped lang="stylus">
#invoiceProgress
  width 100%
  height 100%
  overflow auto
  .my_dialog2
    img
      display block
      height 150px
      width 300px
      margin 10px auto
    .my_color_btn
      width 200px
      display block
      margin 10px auto
  .invoice_list
    box-sizing border-box
    min-height 100px
    width 350px
    padding 10px
    border-radius 10px
    margin 10px auto 0 auto
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    .item_top
      display flex
      align-items center
      width 100%
      margin-bottom 10px
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
      margin 10px 0
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
