<template>
    <div id="moreProblem">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" >
        <div class="problemList" v-for="(item, index) in dataList" :key="index" @click="seeDetail(item)">
          <div class="problemLeft">{{index + 1 | comAddZero}}</div>
          <div class="problemRight">{{item.problem}}</div>
        </div>
      </scroller>
      <van-dialog className="my_dialog" messageAlign="left" v-model="seeDetailStatus" title="问题解答">
        <p v-html="answer"></p>
      </van-dialog>
    </div>
</template>

<script>
import { apiRequestList } from '../../api/home'
// import { comAddZero } from '../../filters'
export default {
  name: 'moreProblem',
  data() {
    return {
      page: 0,
      size: 10,
      seeDetailStatus: false,
      answer: '',
      rowForm: {}, //此次请求出的数据
      dataList: [] //拼接总数据
    }
  },
  filters: {
    comAddZero(value) {
      let result = value
      result = /^\d$/.test(result) ? '0' + result : result
      return result
    }
  },
  methods: {
    // 查看详情
    seeDetail(item) {
      this.seeDetailStatus = true
      this.answer = item.answer
    },
    // 下拉刷新
    refresh(done) {
      setTimeout(() => {
        this.dataList = []
        this.page = 0
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
        page: this.page,
        size: this.size
      }
      apiRequestList(_form).then((res) => {
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
    }
  }
}
</script>

<style scoped lang="stylus">
#moreProblem
  height 100%
  width 100%
  .my_dialog
    box-sizing border-box
    padding 0 10px
  .problemList
    display flex
    align-items center
    min-height 60px
    width 330px
    margin 10px auto
    background #EBEEF5
    .problemLeft
      color #909399
      text-align center
      width 60px
    .problemRight
      width 270px
</style>
