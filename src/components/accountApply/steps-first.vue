<template>
 <div id="steps-first">
   <div class="steps-fixed">
     <p class="mini-title">只需三部轻松完成注册</p>
     <img class="steps-img" src="../../assets/images/accountApply/steps-one.png" alt="">
   </div>
   <van-form class="my_form" @submit="onSubmit">
       <van-field
         v-model="form.signCompany"
         label="签约公司"
         :disabled="userWxInfomation.crmCustomerName !== '' && userWxInfomation.crmCustomerName !== undefined || status === 1"
         placeholder="请写您的签约公司"
         required
         :rules="[{ required: true, message: '请填写签约公司' }]"
       />
       <van-field
         :disabled="status === 1"
         v-model="form.name"
         label="法人姓名"
         placeholder="请输入"
         required
         :rules="[{ required: true, message: '请填写法人姓名' }]"
       />
       <van-field
         readonly
         clickable
         required
         :disabled="status === 1"
         label="园区"
         :rules="[{required: true, message: '请选择园区'}]"
         v-model="form.gardenName"
         placeholder="园区名称"
         @click="tapClikPro"
       />
       <van-popup v-model="showPicker" position="bottom">
         <van-picker
           show-toolbar
           value-key="name"
           :columns="gardenList"
           @cancel="showPicker = false"
           @confirm="onConfirm"
         />
       </van-popup>
       <van-field
         :disabled="status === 1"
         v-model="form.idNo"
         label="法人身份证号"
         placeholder="必须与身份证一致"
         required
         :rules="idNoRules"
       />
       <van-field
         :disabled="status === 1"
         v-model="form.mobile"
         label="联系电话"
         type="tel"
         placeholder="必须为开户行绑定手机号"
         required
         :rules="receiverTelCo"
       />
       <van-field
         :disabled="status === 1"
         v-model="form.bankName"
         label="开户银行名"
         placeholder="精确到开户支行"
         required
         :rules="[{ required: true, message: '请填写开户行名称' }]"
       />
       <van-field
         :disabled="status === 1"
         v-model="form.bankNumber"
         label="开户行账号"
         placeholder="必须为法人申请开户行账号"
         required
         :rules="invoiceBankAccount"
       />
       <!--改写图片上传-->
       <div class="my-uploader">
         <p>
           <span class="my_color_red">* </span>上传法人身份正反面 <span class="my_color_blue" @click="dialog1 = true">请按示例上传</span>
         </p>
         <!--上传功能图片-->
         <div class="my_upload_style">
           <div class="my_upload_child">
             <label v-show="form.imageFace == ''" class="upalod_one" for="inputFile">
               <input :disabled="status === 1" style="display:none;" type="file" id="inputFile" name="file" @change="_uploaderPic($event, 1)">
               <img :src="upload_img" alt="">
             </label>
             <div v-show="form.imageFace" class="upalod_one">
               <img @click="seeBigImg(baseImgUrl + form.imageFace)" :src="baseImgUrl + form.imageFace" alt="">
             </div>
             <p>身份证正面</p>
             <p @click="clearImg(1)" v-show="form.imageFace && status !== 1" class="my_color_blue">清除</p>
           </div>
           <div class="my_upload_child">
             <label v-show="form.imageBack === ''" class="upalod_one" for="inputFile1">
               <input :disabled="status === 1" style="display:none;" type="file" id="inputFile1" name="file" @change="_uploaderPic($event, 2)">
               <img :src="upload_img" alt="">
             </label>
             <div v-show="form.imageBack" class="upalod_one">
               <img @click="seeBigImg(baseImgUrl + form.imageBack)" :src="baseImgUrl + form.imageBack" alt="">
             </div>
             <p>身份证反面</p>
             <p @click="clearImg(2)" v-show="form.imageBack && status !== 1" class="my_color_blue">清除</p>
           </div>

         </div>
       </div>
       <div class="my-uploader">
         <p>
         <span class="my_color_red">* </span>法人正面白底半身照 <span @click="dialog2 = true" class="my_color_blue">请按示例上传</span>
       </p>
         <div class="my_upload_style">
         <div class="my_upload_child">
           <label v-show="form.imageIdentification == ''" class="upalod_one" for="inputFile3">
             <input :disabled="status === 1" style="display:none;" type="file" id="inputFile3" name="file" @change="_uploaderPic($event, 3)">
             <img :src="upload_img" alt="">
           </label>
           <div v-show="form.imageIdentification" class="upalod_one">
             <img @click="seeBigImg(baseImgUrl + form.imageIdentification)" :src="baseImgUrl + form.imageIdentification" alt="">
           </div>
           <p @click="clearImg(3)" v-show="form.imageIdentification && status !== 1" class="my_color_blue">清除</p>
         </div>
       </div>
         </div>
       <van-button v-if="status !== 1" class="my_color_btn"  round block native-type="submit">
       下一步
       </van-button>
       <!--开户进度页面-->
       <div class="submitProgress" v-if="status === 1">
         <img @click="onCancel" src="../../assets/images/accountApply/cancelBtn.png" alt="">
         <label class="progressSubmit" for="progress_submit">
          <van-button style="display: none" round block type="info" id="progress_submit" native-type="submit">
           下一步
         </van-button>
          <img src="../../assets/images/accountApply/nextTap.png" alt="">
         </label>
       </div>

       <div class="my-uploader">
          <p>资料提交 <span class="my_color_red">注意事项</span>：</p>
          <p>提交过程中，请上传<span class="my_color_red">清晰</span>图片</p>
        </div>
     </van-form>
     <van-image-preview closeable v-model="bigImgStatus" :images="images"></van-image-preview>
     <van-dialog class="my_dialog" message-align="center" v-model="dialog1" title="示例">
       <div class="idCard">
         <img src="../../assets/images/accountApply/idCardFace.jpg" />
         <img src="../../assets/images/accountApply/idCardBack.jpg" />
       </div>
    </van-dialog>
     <van-dialog class="my_dialog" message-align="center" v-model="dialog2" title="示例">
       <div class="idCard">
         <img src="../../assets/images/accountApply/legalPerson.jpg" />
       </div>
    </van-dialog>
 </div>
</template>

<script>
import { mapState } from 'vuex'
import { apiSearchBusinessScope } from '../../api/accountApply'
import { invoiceBankAccount, receiverTelCo, idNoRules } from '../../filters'
import axios from 'axios'

export default {
  name: 'steps-first',
  props: {
    status: Number,
    sub_this: Object,
    form: Object
  },
  data() {
    return {
      idNoRules: idNoRules,
      images: [],
      bigImgStatus: false,
      dialog1: false, //法人身份证正反面
      dialog2: false, //法人白底照片
      upload_img: require('../../assets/images/accountApply/upload.png'),
      invoiceBankAccount: invoiceBankAccount, //银行卡号校验
      receiverTelCo: receiverTelCo, //电话校验
      baseImgUrl: process.env.VUE_APP_BASE_IMG, //图片地址前缀
      uploadImgAddress: process.env.VUE_APP_UPLOAD_ADDRESS, //图片上传地址前缀
      businessScopeList: [], //经营范围列表
      showPicker: false //选择园区的picker状态
    }
  },
  computed: {
    ...mapState('accountApply', ['gardenList', 'allInvoiceCategory']),
    ...mapState('home', ['token', 'userWxInfomation'])
  },
  methods: {
    // 园区确定
    onConfirm(value) {
      this.showPicker = false
      this.sub_this.form.gardenName = value.name //园区名
      this.sub_this.form.gardenId = value.id //园区id
      this.searchBusinessScope()
    },
    // 清除上传图片
    clearImg(index) {
      //继续提交表单不允许提交
      // if (this.status === 1) {
      //   this.$toast.fail('无法清除')
      //   return false
      // }
      switch (index) {
        case 1:
          this.sub_this.form.imageFace = ''
          break
        case 2:
          this.sub_this.form.imageBack = ''
          break
        case 3:
          this.sub_this.form.imageIdentification = ''
      }
    },
    // 选择园区
    tapClikPro() {
      if (this.status === 1) {
        return false
      }
      this.showPicker = true
    },
    //查看大图
    seeBigImg(url) {
      this.bigImgStatus = true
      this.images = [] //清空 只显示单张图片
      this.images.push(url)
    },
    // 经营范围
    async searchBusinessScope() {
      //无园区id 返回
      if (!this.sub_this.form.gardenId) {
        return false
      }
      const { data } = await apiSearchBusinessScope(this.sub_this.form.gardenId)
      if (data.code === 1020000 || data.code === 1040400) {
        this.businessScopeList = data.content
      } else {
        this.businessScopeList = []
      }
      // 传值所有id
      const ids = this.businessScopeList.map(item => {
        return item.id
      })
      const taxItemIds = this.allInvoiceCategory.map(it => {
        return it.id
      })
      this.sub_this.form.taxItemIds = taxItemIds.toString() // 开票类目
      this.sub_this.form.businessScopeIds = ids.toString() //经营范围
    },
    //上传身份证正面图片
    _uploaderPic(e, index) {
      const file = e.target.files[0]
      console.log(e.target.files, '所有文件')
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
            if (index === 1) {
              this.sub_this.form.imageFace = data.url
            }
            if (index === 2) {
              this.sub_this.form.imageBack = data.url
            }
            if (index === 3) {
              this.sub_this.form.imageIdentification = data.url
            }
            this.$toast.success('上传成功')
          } else {
            this.$toast.fail(data.message)
          }
        })
    },
    onCancel() {
      //取消操作
      this.$dialog.confirm({
        title: '确定要取消申请吗？',
        message: '点击“确认”后，您提交的资料将被全部删除，是否要确认操作”'
      })
        .then(() => {
          this.$emit('nextSteps', 4)
        })
        .catch(() => {
          console.log('取消了操作')
        })
    },
    // 表单提交
    onSubmit() {
      this.$emit('nextSteps', 1)
    }
  }
}
</script>

<style scoped lang="stylus">
  #steps-first
   width 100%
   height 100%
   box-sizing border-box
   overflow auto
   .my_dialog
     .idCard
       width 100%
       height 400px
       overflow auto
       img
         display block
         width 207px
         margin 10px auto
         height 313px
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
   .my_form
     margin-top 130px
     width 100%
     .my_color_btn
       display block
       margin 0 auto
     .my-uploader
        width 100%
        box-sizing border-box
        padding 10px 8px
        .my_upload_style
          width 100%
          display flex
          margin-top 10px
          .my_upload_child
            width 100px
            height 110px
            text-align center
            .upalod_one
              width 80px
              display inline-block
              height 80px
              border 1px solid #909399
              img
                width 100%
                height 100%
     .submitProgress
       display flex
       justify-content space-around
       margin 16px
       img
        display block
        width 150px
        height 36px
</style>
