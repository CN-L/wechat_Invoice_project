<template>
  <div id="steps-second">
    <div class="steps-fixed">
      <p class="mini-title">只需三部轻松完成注册</p>
      <img class="steps-img" src="../../assets/images/accountApply/steps-two.png" alt="">
    </div>
    <div class="my_upload">
      <!--App截图-->
      <div class="item_upload">
        <p>
          <span class="my_color_red">*</span>上传【登记注册身份验证】APP截图
        </p>
        <img style="vertical-align: middle" src="../../assets/images/accountApply/searchIcon.png" alt=""> <span class="my_color_blue" @click="setSteps(1)" style="vertical-align: middle">查看操作步骤</span>
        <label class="upload_one" for="inputFile4" v-if="form.imageBusinessAuthentication == ''">
          <input style="display:none;" type="file" id="inputFile4" name="file" @change="stepsSecondUpload($event, 1)">
          <img :src="big_upload" alt="">
        </label>
        <div class="upload_one" v-if="form.imageBusinessAuthentication !== ''">
          <img @click="seeBigImg(baseImgUrl + form.imageBusinessAuthentication)" :src="baseImgUrl + form.imageBusinessAuthentication" alt="">
        </div>
        <i @click="clearUploadImg(1)" v-if="form.imageBusinessAuthentication !== ''" class="my_color_blue">清除</i>
      </div>
      <!--公众号实名认证截图-->
      <div class="item_upload">
        <p>
          <span class="my_color_red">*</span>上传公众号实名认证截图
        </p>
        <img style="vertical-align: middle" src="../../assets/images/accountApply/searchIcon.png" alt=""> <span class="my_color_blue" @click="setSteps(2)" style="vertical-align: middle">查看操作步骤</span>
        <label class="upload_one" for="inputFile5" v-if="form.imageRevenueAuthentication == ''">
          <input style="display:none;" type="file" id="inputFile5" name="file" @change="stepsSecondUpload($event, 2)">
          <img :src="big_upload" alt="">
        </label>
        <div class="upload_one" v-if="form.imageRevenueAuthentication !== ''">
          <img @click="seeBigImg(baseImgUrl + form.imageRevenueAuthentication)" :src="baseImgUrl + form.imageRevenueAuthentication" alt="">
        </div>
        <i @click="clearUploadImg(2)" v-if="form.imageRevenueAuthentication !== ''" class="my_color_blue">清除</i>
      </div>
      <!--上传委托书图片-->
      <div class="item_upload">
        <p>
          &nbsp;上传委托书图片
        </p>
<!--        <img style="vertical-align: middle" src="../../assets/images/accountApply/searchIcon.png" alt=""> <span class="my_color_blue" style="vertical-align: middle">查看操作步骤</span>-->
        <label class="upload_one" for="inputFile6" v-if="form.imageAttorney == ''">
          <input style="display:none;" type="file" id="inputFile6" name="file" @change="stepsSecondUpload($event, 3)">
          <img :src="big_upload" alt="">
        </label>
        <div class="upload_one" v-if="form.imageAttorney !== ''">
          <img @click="seeBigImg(baseImgUrl + form.imageAttorney)" :src="baseImgUrl + form.imageAttorney" alt="">
        </div>
        <i @click="clearUploadImg(3)" v-if="form.imageAttorney !== ''" class="my_color_blue">清除</i>
      </div>
      <van-button @click="handleSubmit" round block class="my_color_btn">开户申请提交</van-button>
    </div>
    <van-dialog class="my_dialog" message-align="center" v-model="dialog1">
      <div class="idCard">
        <img v-if="steps === 1" src="../../assets/images/accountApply/idCardInfomation.png" />
        <img v-if="steps === 2" src="../../assets/images/accountApply/wxOfficialAccount.png" />
      </div>
    </van-dialog>
    <van-image-preview closeable v-model="bigImgStatus" :images="images"></van-image-preview>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'steps-second',
  props: {
    form: Object,
    sub_this: Object
  },
  data() {
    return {
      dialog1: false,
      steps: Number,
      images: [],
      bigImgStatus: false,
      baseImgUrl: process.env.VUE_APP_BASE_IMG, //图片地址前缀
      uploadImgAddress: process.env.VUE_APP_UPLOAD_ADDRESS, //图片上传地址前缀
      big_upload: require('../../assets/images/accountApply/bigUpload.jpg')
    }
  },
  computed: {
    ...mapState('home', ['token'])
  },
  methods: {
    //查看大图
    seeBigImg(url) {
      this.bigImgStatus = true
      this.images = [] //清空 只显示单张图片
      this.images.push(url)
    },
    setSteps(index) {
      this.dialog1 = true
      this.steps = index
    },
    // 上传图片
    stepsSecondUpload(e, index) {
      const file = e.target.files[0]
      const type = file.type.split('/')[0]
      if (type !== 'image') {
        this.$toast.fail('请上传jpg或png文件格式')
        return false
      }
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      // 上传图片
      axios({
        method: 'post',
        url: this.uploadImgAddress,
        headers: {
          Authorization: this.token.authorization,
          ContentType: 'application/x-www-form-urlencoded; charset=utf-8'
        },
        dataType: 'json',
        data: formData
      })
        .then(({ data }) => {
          if (data.result === 'yes') {
            if (index == 1) {
              this.sub_this.form.imageBusinessAuthentication = data.url
            }
            if (index == 2) {
              this.sub_this.form.imageRevenueAuthentication = data.url
            }
            if (index == 3) {
              this.sub_this.form.imageAttorney = data.url
            }
            this.$toast.success('上传成功')
          } else {
            this.$toast.fail(data.message || '上传失败')
          }
        })
    },
    handleSubmit() {
      this.$emit('nextSteps', 2)
    },
    //清除上传图片
    clearUploadImg(index) {
      switch (index) {
        case 1:
          this.sub_this.form.imageBusinessAuthentication = ''
          break
        case 2:
          this.sub_this.form.imageRevenueAuthentication = ''
          break
        case 3:
          this.sub_this.form.imageAttorney = ''
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  #steps-second
    width 100%
    height 100%
    box-sizing border-box
    overflow auto
    padding-bottom 20px
    .my_dialog
      .idCard
        width 100%
        height 400px
        overflow auto
        img
          display block
          width 300px
          margin 10px auto
          height auto
    .steps-fixed
      position fixed
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
    .my_upload
       margin-top 130px
       width 100%
       .my_color_btn
         margin 0 auto
       .my_btn
         width 100%
         margin 0 auto
         img
           display block
           margin 0 auto
           width: 330px
           height: 36px
       .item_upload
         width 330px
         margin 0 auto 10px auto
         .upload_one
           width 330px
           display block
           height 150px
           margin-top 10px
           border 1px dotted #909399
           img
            width 100%
            height 100%
         i
           text-align center
           display block
         p
          font-size 16px
          margin-bottom 10px
         img
          height 15px
          width 15px
</style>
