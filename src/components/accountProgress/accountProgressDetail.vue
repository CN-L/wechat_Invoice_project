<template>
 <div id="accountProgressDetail">
   <div v-show="form.applyStatus === 2 && form.accountStatus === 2" class="businessLicense">
     <img class="my_img_business" :src="baseImgUrl + form.imageBusiness" alt="">
     <van-button class="my_color_btn" round>长按上方保存营业执照</van-button>
   </div>
   <van-form class="my_form" @submit="onSubmit">
     <van-field
       v-model="form.signCompany"
       label="签约公司"
       disabled
       placeholder="请写您的签约公司"
       required
       :rules="[{ required: true, message: '请填写签约公司' }]"
     />
     <van-field
       v-model="form.name"
       label="法人姓名"
       :disabled="form.nameStatus !== 2"
       placeholder="请输入"
       required
       :rules="[{ required: true, message: '请填写法人姓名' }]"
     />
     <span v-if="form.nameStatus === 2" class="my_color_red my_stl">{{form.nameRemark}}</span>
     <van-field
       readonly
       clickable
       required
       :disabled="form.gardenStatus !== 2"
       label="园区"
       :rules="[{required: true, message: '请选择园区'}]"
       v-model="form.gardenName"
       placeholder="园区名称"
       @click="tapClikPro"
     />
     <span v-if="form.gardenStatus === 2" class="my_color_red my_stl">{{form.gardenRemark}}</span>
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
       :disabled="form.idNoStatus !== 2"
       v-model="form.idNo"
       label="法人身份证号"
       placeholder="必须与身份证一致"
       required
       :rules="[{ required: true, message: '请填写法人身份证号' }]"
     />
     <span v-if="form.idNoStatus === 2" class="my_color_red my_stl">{{form.idNoRemark}}</span>
     <van-field
       :disabled="form.mobileStatus !== 2"
       v-model="form.mobile"
       label="联系电话"
       type="tel"
       placeholder="必须为开户行绑定手机号"
       required
       :rules="receiverTelCo"
     />
     <span v-if="form.mobileStatus === 2" class="my_color_red my_stl">{{form.mobileRemark}}</span>
     <van-field
       :disabled="form.bankNameStatus !==2"
       v-model="form.bankName"
       label="开户银行名"
       placeholder="精确到开户支行"
       required
       :rules="[{ required: true, message: '请填写开户行名称' }]"
     />
     <span class="my_color_red my_stl" v-if="form.bankNameStatus === 2">{{form.bankNameRemark}}</span>
     <van-field
       :disabled="form.bankNumberStatus !== 2"
       v-model="form.bankNumber"
       label="开户行账号"
       placeholder="必须为法人申请开户行账号"
       required
       :rules="invoiceBankAccount"
     />
     <span v-if="form.bankNumberStatus === 2">{{form.bankNumberRemark}}</span>
     <!--改写图片上传-->
     <div class="my-uploader">
       <p>
         <span class="my_color_red">* </span>上传法人身份正反面 <span class="my_color_blue" @click="setSteps(4)">请按示例上传</span>
       </p>
       <!--上传功能图片-->
       <div class="my_upload_style">
         <div class="my_upload_child">
           <label v-show="form.imageFace == ''" class="upalod_one" for="inputFile">
             <input style="display:none;" type="file" id="inputFile" name="file" @change="_uploaderPic($event, 1)">
             <img :src="upload_img" alt="">
           </label>
           <div v-show="form.imageFace" class="upalod_one">
             <img @click="seeBigImg(baseImgUrl + form.imageFace)" :src="baseImgUrl + form.imageFace" alt="">
           </div>
           <p>身份证正面</p>
           <p @click="clearImg(1)" v-show="form.imageFace && form.imageFaceStatus == 2" class="my_color_blue">清除</p>
           <span v-show="form.imageFaceStatus === 2" class="my_color_red">{{form.imageFaceRemark}}</span>
         </div>
         <div class="my_upload_child">
           <label v-show="form.imageBack == ''" class="upalod_one" for="inputFile1">
             <input style="display:none;" type="file" id="inputFile1" name="file" @change="_uploaderPic($event, 2)">
             <img :src="upload_img" alt="">
           </label>
           <div v-show="form.imageBack !== ''" class="upalod_one">
             <img @click="seeBigImg(baseImgUrl + form.imageBack)" :src="baseImgUrl + form.imageBack" alt="">
           </div>
           <p>身份证反面</p>
           <p @click="clearImg(2)" v-show="form.imageBack && form.imageBackStatus == 2" class="my_color_blue">清除</p>
           <span v-show="form.imageBackStatus === 2" class="my_color_red">{{form.imageBackRemark}}</span>
         </div>
       </div>
     </div>
     <div class="my-uploader">
       <p>
         <span class="my_color_red">* </span>法人正面白底半身照 <span class="my_color_blue" @click="setSteps(3)">请按示例上传</span>
       </p>
       <div class="my_upload_style">
         <div class="my_upload_child">
           <label v-show="form.imageIdentification == ''" class="upalod_one" for="inputFile3">
             <input  style="display:none;" type="file" id="inputFile3" name="file" @change="_uploaderPic($event, 3)">
             <img :src="upload_img" alt="">
           </label>
           <div v-show="form.imageIdentification !== ''" class="upalod_one">
             <img @click="seeBigImg(baseImgUrl + form.imageIdentification)" :src="baseImgUrl + form.imageIdentification" alt="">
           </div>
           <p @click="clearImg(3)" v-show="form.imageIdentification && form.imageIdentificationStatus == 2" class="my_color_blue">清除</p>
           <span v-show="form.imageIdentificationStatus === 2" class="my_color_red">{{form.imageIdentificationRemark}}</span>
         </div>
       </div>
     </div>

     <!--大截图-->

     <div class="my_upload">
       <!--App截图-->
       <div class="item_upload">
         <p>
           <span class="my_color_red">*</span>上传【登记注册身份验证】APP截图
         </p>
         <img style="vertical-align: middle" src="../../assets/images/accountApply/searchIcon.png" alt=""> <span class="my_color_blue" @click="setSteps(1)" style="vertical-align: middle">查看操作步骤</span>
         <label class="upload_one" for="inputFile4" v-if="form.imageBusinessAuthentication == ''">
           <input style="display:none;" type="file" id="inputFile4" name="file" @change="_uploaderPic($event, 4)">
           <img :src="big_upload" alt="">
         </label>
         <div class="upload_one" v-if="form.imageBusinessAuthentication !== ''">
           <img @click="seeBigImg(baseImgUrl + form.imageBusinessAuthentication)" :src="baseImgUrl + form.imageBusinessAuthentication" alt="">
         </div>
         <i @click="clearImg(4)" v-if="form.imageBusinessAuthentication && form.imageBusinessAuthenticationStatus === 2" class="my_color_blue">清除</i>
         <span class="my_color_red" v-if="form.imageBusinessAuthenticationStatus === 2">{{form.imageBusinessAuthenticationRemark}}</span>
       </div>
       <!--公众号实名认证截图-->
       <div class="item_upload">
         <p>
           <span class="my_color_red">*</span>上传公众号实名认证截图
         </p>
         <img style="vertical-align: middle" src="../../assets/images/accountApply/searchIcon.png" alt=""> <span class="my_color_blue" @click="setSteps(2)" style="vertical-align: middle">查看操作步骤</span>
         <label class="upload_one" for="inputFile5" v-if="form.imageRevenueAuthentication == ''">
           <input style="display:none;" type="file" id="inputFile5" name="file" @change="_uploaderPic($event, 5)">
           <img :src="big_upload" alt="">
         </label>
         <div class="upload_one" v-if="form.imageRevenueAuthentication !== ''">
           <img @click="seeBigImg(baseImgUrl + form.imageRevenueAuthentication)" :src="baseImgUrl + form.imageRevenueAuthentication" alt="">
         </div>
         <i @click="clearImg(5)" v-if="form.imageRevenueAuthentication && form.imageRevenueAuthenticationStatus == 2" class="my_color_blue">清除</i>
         <span class="my_color_red" v-if="form.imageRevenueAuthenticationStatus === 2">{{form.imageRevenueAuthenticationRemark}}</span>
       </div>
       <!--上传委托书图片-->
       <div class="item_upload">
         <p>
           &nbsp;上传委托书图片
         </p>
<!--         <img style="vertical-align: middle" src="../../assets/images/accountApply/searchIcon.png" alt=""> <span class="my_color_blue" style="vertical-align: middle">查看操作步骤</span>-->
         <label class="upload_one" for="inputFile6" v-if="form.imageAttorney == ''">
           <input style="display:none;" type="file" id="inputFile6" name="file" @change="_uploaderPic($event, 6)">
           <img :src="big_upload" alt="">
         </label>
         <div class="upload_one" v-if="form.imageAttorney !== ''">
           <img @click="seeBigImg(baseImgUrl + form.imageAttorney)" :src="baseImgUrl + form.imageAttorney" alt="">
         </div>
         <i @click="clearImg(6)" v-if="form.imageAttorney && form.imageAttorneyStatus === 2" class="my_color_blue">清除</i>
         <span v-if="form.imageAttorneyStatus === 2">{{form.imageAttorneyRemark}}</span>
       </div>
       <div v-if="form.applyStatus === 3 && form.accountStatus === 0" class="my_btn">
         <img @click="handleSubmit" src="../../assets/images/accountProgress/submit.png" alt="">
       </div>
       <van-row type="flex" justify="space-around" align="center" v-if="form.accountStatus === 3 && form.applyStatus === 3">
         <van-button round class="my_color_btn" style="width: 4rem" @click="noCancelApply">取消注销申请</van-button>
         <van-button round class="my_color_btn" style="width: 4rem" @click="cancellationTap">再次提交</van-button>
       </van-row>
       <van-button v-if="form.applyStatus === 2 && form.accountStatus === 2" style="display: block;margin: 10px auto" class="my_color_btn my_color_btn1" round @click="cancellationTap">申请注销</van-button>
       <div v-show="!(form.applyStatus === 2 && form.accountStatus === 2)" class="my-uploader">
         <p>资料提交 <span class="my_color_red">注意事项</span>：</p>
         <p>提交过程中，请上传<span class="my_color_red">清晰</span>图片</p>
       </div>
     </div>
   </van-form>
   <van-dialog class="my_dialog" message-align="center" v-model="dialog1" title="示例">
     <div class="idCard">
       <img class="img1" src="../../assets/images/accountApply/idCardFace.jpg" />
       <img class="img1" src="../../assets/images/accountApply/idCardBack.jpg" />
     </div>
   </van-dialog>
   <!--操作提示-->
   <van-dialog class="my_dialog" message-align="center" v-model="dialog1" title="提示">
     <div class="idCard">
       <img class="img1" v-if="steps === 4" src="../../assets/images/accountApply/idCardFace.jpg" />
       <img class="img1" v-if="steps === 4" src="../../assets/images/accountApply/idCardBack.jpg" />
       <img class="img1" v-if="steps === 3" src="../../assets/images/accountApply/legalPerson.jpg" />
       <img class="img2" v-if="steps === 1" src="../../assets/images/accountApply/idCardInfomation.png" />
       <img class="img2" v-if="steps === 2" src="../../assets/images/accountApply/wxOfficialAccount.png" />
     </div>
   </van-dialog>
   <van-image-preview closeable v-model="bigImgStatus" :images="images"></van-image-preview>
 </div>
</template>

<script>
import { apiContinueSubmit, apiCancelAccountApply, apiNoCancalApply } from '../../api/accountProgress'
import { apiRegisterContinue, apiSearchBusinessScope } from '../../api/accountApply'
import { startLoading, closeLoading } from '../../utils/loading'
import { mapActions, mapState } from 'vuex'

import { invoiceBankAccount, receiverTelCo, idNoRules } from '../../filters'
import axios from 'axios'
export default {
  name: 'accountProgressDetail',
  data() {
    return {
      idNoRules: idNoRules, //身份证验证
      showPicker: false,
      dialog1: false,
      steps: Number,
      invoiceBankAccount: invoiceBankAccount,
      receiverTelCo: receiverTelCo,
      big_upload: require('../../assets/images/accountApply/bigUpload.jpg'),
      upload_img: require('../../assets/images/accountApply/upload.png'),
      baseImgUrl: process.env.VUE_APP_BASE_IMG, //图片回显地址前缀
      uploadImgAddress: process.env.VUE_APP_UPLOAD_ADDRESS, //图片上传地址前缀
      businessScopeList: [],
      bigImgStatus: false,
      images: [],
      form: {
        signCompany: '',
        nameStatus: '',
        imageBackStatus: '',
        imageBusiness: '',
        imageFaceRemark: '',
        gardenStatus: '',
        imageAttorneyStatus: '',
        imageAttorneyRemark: '',
        gardenRemark: '',
        taxItemIds: '',
        imageBusinessAuthenticationStatus: '',
        imageBusinessAuthenticationRemark: '',
        idNoRemark: '',
        imageFaceStatus: '',
        idNoStatus: '',
        mobileStatus: '',
        mobileRemark: '',
        nameRemark: '',
        idNo: '',
        bankNumberStatus: '',
        imageIdentificationStatus: '',
        imageRevenueAuthenticationStatus: '',
        businessScopeIds: ''
      }
    }
  },
  mounted() {
    this.seeDetails() //详情
    this.doSearchGarden() //所有园区
  },
  computed: {
    ...mapState('accountApply', ['gardenList', 'allInvoiceCategory']),
    ...mapState('home', ['token', 'userWxInfomation']),
    // signType() {
    //   return this.$route.query.signType
    // },
    // different() {
    //   return this.$route.query.different
    // },
    accId() {
      return this.$route.query.id
    }
  },
  methods: {
    ...mapActions('accountApply', ['doSearchGarden', 'doInvoiceCategoty']), //园区和开票类目
    onSubmit() {
      console.log('提交表单申请')
    },
    //取消申请注销
    async noCancelApply() {
      this.$dialog.confirm({
        title: '即将取消申请注销',
        message: '是否继续',
        width: '300px',
        messageAlign: 'left'
      })
        .then(async() => {
          const { data } = await apiNoCancalApply(this.accId)
          if (data.code === 1020000) {
            this.$toast.success('提交成功')
            this.$router.push('/accountProgress')
          }
        })
        .catch(() => {
          console.log('取消操作')
        })
    },
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
    // 提交
    async handleSubmit() {
      const _form = {
        ...this.form,
        wxUserInfoId: this.userWxInfomation.id
      }
      //更改重新审核状态 以及错误原因清空 单项数据绑定
      /*for (const item in _form) {
        //不等于-1证明他是Status状态
        if (item.search('Status') != -1) {
          if (_form[item] == 2) {
            const str1 = item.match(/(\S*)Status/)[1]
            _form[str1 + 'Status'] = 0
            _form[str1 + 'Remark'] = ''
          }
        }
      }
      console.log(_form)
      */
      const { data } = await apiRegisterContinue(_form)
      if (data.code === 1020000) {
        this.$toast.success('提交成功')
        this.$router.push('/accountProgress')
      }
    },
    //确认园区
    onConfirm(value) {
      this.showPicker = false
      this.form.gardenName = value.name //园区名
      this.gardenId = value.id //园区id
      this.searchBusinessScope()
    },
    // 经营范围
    async searchBusinessScope() {
      //无园区id 返回
      if (!this.form.gardenId) {
        return false
      }
      const { data } = await apiSearchBusinessScope(this.form.gardenId)
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
      this.form.taxItemIds = taxItemIds.toString() // 开票类目
      this.form.businessScopeIds = ids.toString() //经营范围
    },
    // 清除上传图片
    clearImg(index) {
      // const { imageFaceStatus, imageBackStatus, imageIdentificationStatus, imageBusinessAuthenticationStatus, imageBusinessAuthentication, imageRevenueAuthentication, imageRevenueAuthenticationStatus, imageAttorneyStatus, imageAttorney } = this.form
      // if (index === 1 && imageFaceStatus !== 2) {
      //   return false
      // }
      // if (index === 2 && imageBackStatus !== 2) {
      //   return false
      // }
      // if (index === 3 && imageIdentificationStatus !== 2) {
      //   return false
      // }
      // // 图片为空 并且审核状态未通过 1为通过
      // if (index === 4 && (imageBusinessAuthenticationStatus !== 2 || imageBusinessAuthentication === '')) {
      //   return false
      // }
      // if (index === 5 && (imageRevenueAuthenticationStatus !== 2 || imageRevenueAuthentication === '')) {
      //   return false
      // }
      // if (index === 6 && (imageAttorneyStatus !== 2 || imageAttorney === '')) {
      //   return false
      // }
      switch (index) {
        case 1:
          this.form.imageFace = ''
          break
        case 2:
          this.form.imageBack = ''
          break
        case 3:
          this.form.imageIdentification = ''
          break
        case 4:
          this.form.imageBusinessAuthentication = ''
          break
        case 5:
          this.form.imageRevenueAuthentication = ''
          break
        case 6:
          this.form.imageAttorney = ''
      }
    },
    //查看详情
    async seeDetails() {
      const _form = {
        accId: this.accId
      }
      const { data } = await apiContinueSubmit(_form)
      if (data.code === 1020000 || data.code === 1040400) {
        this.form = data.content
      } else {
        this.form = {}
      }
    },
    //上传身份证正面图片
    _uploaderPic(e, index) {
      const file = e.target.files[0]
      const type = file.type.split('/')[0]
      if (type !== 'image') {
        this.$toast.fail('请上传jpg或png文件格式')
        return false
      }
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const _loading = startLoading()
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
              this.form.imageFace = data.url
            }
            if (index === 2) {
              this.form.imageBack = data.url
            }
            if (index === 3) {
              this.form.imageIdentification = data.url
            }
            if (index === 4) {
              this.form.imageBusinessAuthentication = data.url
            }
            if (index === 5) {
              this.form.imageRevenueAuthentication = data.url
            }
            if (index === 6) {
              this.form.imageAttorney = data.url
            }
            closeLoading(_loading) //关闭loading
            this.$toast.success('上传成功')
          } else {
            closeLoading(_loading) //关闭loading
            this.$toast.fail(data.message)
          }
        })
    },
    //申请注销
    async cancellationTap() {
      this.$dialog.confirm({
        title: '确认申请注销吗？',
        message: '申请注销成功后，您的个体户营业执照将失效，无法继续申请开票了哦！',
        width: '300px',
        messageAlign: 'left'
      })
        .then(() => {
          this.cancelTapClick() //注销
        })
        .catch(() => {
          console.log('取消操作')
        })
    },
    // 确认取消了
    async cancelTapClick() {
      const _form = {
        ...this.form
      }
      const { data } = await apiCancelAccountApply(_form)
      if (data.code === 1020000) {
        this.$toast.success('提交成功')
        this.$router.push('/accountProgress')
      }
    },
    // 园区禁弹框
    tapClikPro() {
      if (this.form.gardenStatus !== 2) {
        return false
      } else {
        this.showPicker = true
      }
    }
  }
}
</script>

<style scoped lang="stylus">
#accountProgressDetail
  height 100%
  width 100%
  padding-bottom 20px
  box-sizing border-box
  overflow auto
  .my_dialog
    .idCard
      width 100%
      height 400px
      overflow auto
      .img2
          display block
          width 300px
          margin 10px auto
          height auto
      .img1
        display block
        width 207px
        margin 10px auto
        height 313px
  .businessLicense
    background #E4E7ED
    width 100%
    text-align center
    .my_img_business
      display block
      width 330px
      margin 0 auto
      height 240px
    .my_color_btn
      margin 10px auto
  .my_form
   width 100%
   margin-top 10px
   .my_stl
     margin-left 16px
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
          min-height 110px
          text-align center
          .upalod_one
            width 80px
            display inline-block
            height 80px
            border 1px solid #909399
            img
              width 100%
              height 100%
   .my_upload
      margin-top 10px
      box-sizing border-box
      padding 10px 8px
      width 100%
      .my_btn
        width 100%
        margin 0 auto
        img
          display block
          margin 0 auto
          width: 100%
          height: 36px
      .item_upload
        width 100%
        margin 0 auto 10px auto
        .upload_one
          width 100%
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
