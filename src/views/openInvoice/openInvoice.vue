<template>
  <div id="openInvoice">
    <van-form label-width="3.2rem" class="invoice_form" @submit="onSubmit">
      <van-field
        v-if="merchantList.length >= 1"
        required
        clickable
        label="开票个体户"
        readonly
        :disabled="seeTitle === '查看' || seeTitle === '打款凭证'"
        :rules="[{required: true, message: '请选择开票个体户'}]"
        :value="form.drawerName"
        placeholder="请点击选择"
        @click="selectBtn(1)"
      />
      <van-field
        v-if="merchantList.length < 1"
        required
        clickable
        label="开票个体户"
        readonly
        :rules="[{required: true, message: '请选择开票个体户'}]"
        disabled
        :value="form.drawerName"
        placeholder="暂无数据"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="merchantList"
          value-key="businessName"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <div v-if="form.drawerId" style="margin-left: 16px" class="my_color_blue">
        <van-row>
          <van-col span="14"></van-col>
          <van-col span="10">
            <span v-if="balanceAmount && seeTitle !== '查看'">开票余额&nbsp;{{balanceAmount}}万元</span>
          </van-col>
        </van-row>
      </div>
      <van-field
        v-model="form.invoiceAmount"
        required
        :disabled="seeTitle === '查看' || seeTitle === '打款凭证'"
        label="开票金额（元）"
        type="number"
        placeholder="请输入"
        :rules="invoicedAmount"
      />
      <van-field required name="radio" label="发票类型" :rules="[{required: true, message: '请选择开票类型'}]">
        <template #input>
          <van-radio-group v-model="form.invoiceType">
            <van-radio :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" class="my_radio" :name="1">增值税专用发票（税率1%）<van-icon @click.stop="seeDetailRate" name="question" /></van-radio>
            <span class="my_color_grey" v-if="form.invoiceType == 1">(税费{{form.serviceAmount}}元)</span>
            <van-radio :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" class="my_radio" :name="2">增值税专用发票（税率3%）<van-icon @click.stop="seeDetailRate" name="question" /></van-radio>
            <span class="my_color_grey" v-if="form.invoiceType == 2">(税费{{form.serviceAmount}}元)</span>
            <van-radio :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" class="my_radio" :name="3">增值税普通发票（税率1%）<van-icon @click.stop="seeDetailRate" name="question" /></van-radio>
            <span class="my_color_grey" v-if="form.invoiceType == 3">(税费{{form.serviceAmount}}元)</span>
            <van-radio :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" class="my_radio" :name="4">增值税普通发票（税率3%）<van-icon @click.stop="seeDetailRate" name="question" /></van-radio>
            <span class="my_color_grey" v-if="form.invoiceType == 4">(税费{{form.serviceAmount}}元)</span>
            <van-row style="color: #606266">
              <van-col span="5"></van-col>
              <van-col span="4"></van-col>
              <van-col @click="seeDetailStatus = true"  span="15">
                <i class="my-icon my-icon-iconset0143"></i>
                <i style="text-decoration: underline;border-bottom: 2px">税费收款账户</i>
              </van-col>
            </van-row>

          </van-radio-group>
        </template>
      </van-field>
      <van-field :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" label="受票方公司名称" v-model="form.draweeTitle" placeholder="请输入" required :rules="[{required: true, message: '请输入受票方公司名称'}]" />
      <van-field :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" label="受票方税号" v-model="form.draweeNumber" placeholder="请输入" required :rules="[{required: true, message: '请输入受票方税号'}]" />
      <van-field :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" label="受票方开户行名称" v-model="form.draweeBankName" placeholder="精确到开户行支行" required :rules="[{required: true, message: '请输入受票方开户行名称'}]" />
      <van-field :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" label="受票方开户账号" v-model="form.draweeBankNumber" placeholder="请输入" required :rules="[{required: true, message: '请输入受票方开户账号'}]" />
      <van-field :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" label="受票方开票地址" v-model="form.draweeAddress" placeholder="请输入" required :rules="[{required: true, message: '请输入受票方开票地址'}]" />
      <van-field :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" label="受票方联系电话" v-model="form.draweeMobile" placeholder="请输入" required :rules="[{required: true, message: '请输入受票方联系电话'}]" />
      <van-field :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" required readonly clickable @click="selectBtn(2)" label="开票内容" v-model="form.invoiceCategoryName" placeholder="请点击选择" :rules="[{required: true, message: '请选择开票内容'}]" />
      <van-popup :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" v-model="showPicker1" round position="bottom">
        <van-picker
          show-toolbar
          :columns="taxItemIdsList"
          value-key="taxItemName"
          @cancel="showPicker1 = false"
          @confirm="onSelectTax"
        />
      </van-popup>
      <van-field :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" label="项目名称" v-model="form.productName" placeholder="请输入" />
      <van-field :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" label="项目地点" v-model="form.productAddress" placeholder="请输入" />
      <van-field :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" label="合同名称" v-model="form.contractName" placeholder="请输入" required :rules="[{required: true, message: '请填写合同名称'}]" />
      <!--上传合同-->
      <div class="my-uploader">
        <p>
          <span class="my_color_red">* </span>上传合同
        </p>
        <div class="my_upload_style">
          <div class="my_upload_child">
            <label v-show="form.imageContract == ''" class="upalod_one" for="contract1">
              <input :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" style="display:none;" type="file" id="contract1" name="file" @change="_uploaderContract($event, 1)">
              <img :src="upload_img" alt="">
            </label>
            <div v-show="form.imageContract !== ''" class="upalod_one">
              <img @click="seeBigImg(baseImgUrl + form.imageContract)" :src="baseImgUrl + form.imageContract" alt="">
            </div>
            <p @click="clearImg(1)" v-show="form.imageContract !== '' && (seeTitle !== '打款凭证' && seeTitle !== '查看')" class="my_color_blue">清除</p>
          </div>
        </div>
      </div>
      <!--打款凭证（给平台）-->
      <div class="my-uploader">
        <p>
          <span class="my_color_red">* </span>打款凭证1 （给平台）
        </p>
        <div class="my_upload_style">
          <div class="my_upload_child">
            <label v-show="form.moneyCertificatesPlatform == ''" class="upalod_one" for="contract2">
              <input :disabled="seeTitle === '查看'" style="display:none;" type="file" id="contract2" name="file" @change="_uploaderContract($event, 2)">
              <img :src="upload_img" alt="">
            </label>
            <div v-show="form.moneyCertificatesPlatform !== ''" class="upalod_one">
              <img @click="seeBigImg(baseImgUrl + form.moneyCertificatesPlatform)" :src="baseImgUrl + form.moneyCertificatesPlatform" alt="">
            </div>
            <p @click="clearImg(2)" v-show="form.moneyCertificatesPlatform !== '' && (seeTitle !== '打款凭证' && seeTitle !== '查看')" class="my_color_blue">清除</p>
          </div>
          <div @click="seeDetailStatus = true" class="my_text_content my_color_grey">
            <p v-if="form.serviceAmount">{{form.serviceAmount}}元</p>
            <p><i class="my-icon my-icon-iconset0143"></i>税费收款账户</p>
          </div>

        </div>
      </div>
      <!--打款凭证（给个人）-->
      <div class="my-uploader">
        <p>
          打款凭证1 （给个人）
        </p>
        <div class="my_upload_style">
          <div class="my_upload_child">
            <label v-show="form.moneyCertificatesPerson == ''" class="upalod_one" for="contract3">
              <input :disabled="seeTitle === '查看'" style="display:none;" type="file" id="contract3" name="file" @change="_uploaderContract($event, 3)">
              <img :src="upload_img" alt="">
            </label>
            <div v-show="form.moneyCertificatesPerson !== ''" class="upalod_one">
              <img @click="seeBigImg(baseImgUrl + form.moneyCertificatesPerson)" :src="baseImgUrl + form.moneyCertificatesPerson" alt="">
            </div>
            <p @click="clearImg(3)" v-show="form.moneyCertificatesPerson !== ''" class="my_color_blue">清除</p>
          </div>
          <div class="my_text_content my_color_grey">
              <div>此凭证可补传，但若开发完发票未补传则有被举报偷税漏税风险哦</div>
          </div>

        </div>
      </div>
      <div class="my-textarea">
        <p>邮寄信息</p>
        <textarea v-model="form.deliveryInfo" :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" class="my_textArea" name="" placeholder="请填写邮寄地址及收件人姓名电话"></textarea>
      </div>
      <div class="my-textarea">
        <p>备注</p>
        <textarea v-model="form.deliveryMessage" :disabled="seeTitle === '查看' || seeTitle === '打款凭证'" class="my_textArea" name=""></textarea>
      </div>
      <div v-if="seeTitle !== '查看'" style="margin: 16px;">
        <van-button class="my_color_btn" round block native-type="submit">
          提交
        </van-button>
      </div>
      <div class="my_des_text">
        请法人注意接收税务局得<span class="my_color_red">短信验证码</span>，发票代理将在开票期间电话联系法人询问验证码,请<span class="my_color_red">注意接听电话</span>
      </div>
    </van-form>
    <!--税金收款账户详情-->
    <van-dialog className="my_dialog" messageAlign="left" v-model="seeDetailStatus" title="详情">
      <p>开票税费支付账户</p>
      <p>账户名称：铅山县士力架建筑服务经营部</p>
      <p>开户银行：江西铅山农村商业银行股份有限公司福惠支行</p>
      <p>银行账户：<span class="my_color_blue">163129168000012468</span></p>
      <p>开户行行号：402433500100</p>
      <p>电话：<a href="tel:0793-7962517">0793-7962517</a></p>
    </van-dialog>
    <!--图片放大器-->
    <van-image-preview closeable v-model="bigImgStatus" :images="images"></van-image-preview>
    <!--费率详情-->
    <van-dialog class="my_dialog1" v-model="dialog1" title="详情">
      <div style="margin: 10px 5px">
        <span>1%的增值税发票综合税费为2.6%（包含个税和附加税）,3%的增值税发票综合税费为4.8%（包含个税和附加税）</span>
      </div>
    </van-dialog>
    <!--详情-->
    <van-dialog class="my_dialog1" message="left" title="确认您的发票信息" show-cancel-button @cancel="seeDetailInfoInvoice = false"  @confirm="submitInvoice" v-model="seeDetailInfoInvoice">
      <p>受票方发票抬头：{{form.draweeTitle}}</p>
      <p>受票方税号：{{form.draweeNumber}}</p>
      <p>受票方开户行：{{form.draweeBankName}}</p>
      <p>受票方开户行账号：{{form.draweeBankNumber}}</p>
      <p>受票方开票地址：{{form.draweeAddress}}</p>
      <p>受票方联系电话：{{form.draweeMobile}}</p>
      <div class="my_inline"></div>
      <p>开票类目：{{form.invoiceCategoryName}}</p>
      <p>开票金额（小写）：{{form.invoiceAmount}}</p>
      <p>开票金额（大写）：{{form.invoiceAmount | money_Capitalized}}</p>
      <p>项目名称：{{form.productName}}</p>
      <p>项目地址：{{form.productAddress}}</p>
    </van-dialog>
  </div>
</template>

<script>
import { apiSearchMerchantAll, apiSubmitFormInvoice, apiSeedetail, apiSupplementEdit, apiMyMerchant } from '../../api/openInvoice'
import { invoicedAmount, multiplicationCom, compTo } from '../../filters'
import { mapState } from 'vuex'
import { startLoading, closeLoading } from '../../utils/loading'
import axios from 'axios'
export default {
  name: 'openInvoice',
  data() {
    return {
      // isMain: 1,
      bigImgStatus: false,
      images: [],
      dialog1: false, //费率详情
      upload_img: require('../../assets/images/accountApply/upload.png'), //上传样式
      invoicedAmount: invoicedAmount, //开票金额输入规则
      baseImgUrl: process.env.VUE_APP_BASE_IMG, //图片回显地址前缀
      uploadImgAddress: process.env.VUE_APP_UPLOAD_ADDRESS, //图片上传地址前缀
      seeDetailStatus: false,
      seeDetailInfoInvoice: false, //确认信息
      form: {
        drawerName: '',
        drawerId: '',
        invoiceType: '',
        invoiceAmount: '',
        serviceAmount: '',
        productAddress: '',
        draweeTitle: '',
        draweeMobile: '',
        contractName: '',
        draweeBankNumber: '',
        imageContract: '',
        draweeBankName: '',
        draweeAddress: '',
        invoiceCategoryName: '',
        deliveryMessage: '',
        productName: '',
        deliveryInfo: '', //邮寄信息
        moneyCertificatesPlatform: '',
        moneyCertificatesPerson: '',
        draweeNumber: ''
      },
      // balanceAmount: '', //只做展示
      showPicker: false, //开票个体户选择
      showPicker1: false, //开票类目选择
      merchantList: [],
      taxItemIdsList: []
    }
  },
  watch: {
    // 改变了发票类型
    'form.invoiceType': function(newValue, oldValue) {
      switch (Number(newValue)) {
        case 1:
          this.$set(this.form, 'serviceTariffing', 0.026)
          break
        case 2:
          this.$set(this.form, 'serviceTariffing', 0.048)
          break
        case 3:
          this.$set(this.form, 'serviceTariffing', 0.026)
          break
        case 4:
          this.$set(this.form, 'serviceTariffing', 0.048)
      }
      const serviceAmount = this.multiplicationCom(this.form.invoiceAmount, this.form.serviceTariffing) || 0
      this.$set(this.form, 'serviceAmount', serviceAmount)
    },
    'form.invoiceAmount': function(newValue, oldValue) {
      const serviceAmount = this.multiplicationCom(Number(newValue), this.form.serviceTariffing) || 0
      this.$set(this.form, 'serviceAmount', serviceAmount)
    },
    // 实时监听状态改变 触发请求
    taxItemIds: function(newValue) {
      this.searchMyTax() //检测到开票类目id改变 发送请求
    }
  },
  computed: {
    ...mapState('home', ['userWxInfomation', 'token']),
    // ...mapState('openInvoice', ['allInvoiceTaxItems']),
    invoiceId() {
      return this.$route.query.id//详情id
    },
    //用于查看详情渲染和自主选择
    balanceAmount() {
      let balanceAmount = ''
      this.merchantList.map(item => {
        if (this.form.drawerId == item.id) {
          balanceAmount = item.balanceAmount
        }
      })
      console.log(balanceAmount, '开票余额')
      return balanceAmount
    },
    // 选中个体工商户名下开票类目id 用于反向渲染和正向渲染（如果可以修改）
    taxItemIds() {
      let taxItemIds = ''
      this.merchantList.map(item => {
        if (item.id == this.form.drawerId) {
          taxItemIds = item.taxItemIds
        }
      })
      return taxItemIds
    },
    seeTitle() {
      return this.$route.query.seeTitle//详情id
    }
    //服务费计算 -- computed会出现状态改变不触发情况
    // serviceAmount: function() {
    //   console.log('2')
    //   // console.log('form', this.form)
    //   // // if (!this.form.invoiceType && !this.form.invoiceAmount) {
    //   // //   return ''
    //   // // }
    //   // console.log('2')
    //   const serviceAmount = this.multiplicationCom(this.form.invoiceAmount, this.form.serviceTariffing)
    //   this.$set(this.form, 'serviceAmount', serviceAmount)
    //   return serviceAmount || 0
    // }
  },
  mounted() {
    this.seeDetail()// 查看详情
    this.searchMerchat() //查询个体户名称
  },
  methods: {
    //费率详情
    seeDetailRate() {
      this.dialog1 = true
    },
    //查看大图
    seeBigImg(url) {
      this.bigImgStatus = true
      this.images = [] //清空 只显示单张图片
      this.images.push(url)
    },
    // picker选择器
    selectBtn(index) {
      if (this.seeTitle === '查看' || this.seeTitle === '打款凭证') {
        return false
      }
      switch (index) {
        case 1:
          if (this.seeTitle === '修改') {
            return false
          }
          this.showPicker = true
          break
        case 2:
          // 未选择个体户名称
          if (!this.form.drawerId) {
            this.$toast.fail('请先选择开票个体户')
            return false
          }
          this.showPicker1 = true
      }
    },
    // 查询旗下个体户名称
    async searchMerchat() {
      const _form = {
        userid: this.userWxInfomation.id
      }
      const { data } = await apiSearchMerchantAll(_form)
      if (data.code === 1020000 || data.code === 1040400) {
        this.merchantList = data.content
      }
    },
    //上传图片
    _uploaderContract(e, index) {
      const file = e.target.files[0]
      const type = file.type.split('/')[0]
      if (type !== 'image') {
        this.$toast.fail('请上传jpg或png文件格式')
        return false
      }
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const _loading = startLoading() //loading开启
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
          closeLoading(_loading) //关闭loading
          if (data.result === 'yes') {
            if (index === 1) {
              this.form.imageContract = data.url
            }
            if (index === 2) {
              this.form.moneyCertificatesPlatform = data.url
            }
            if (index === 3) {
              this.form.moneyCertificatesPerson = data.url
            }
            this.$toast.success('上传成功')
          } else {
            this.$toast.fail(data.message)
          }
        })
        .catch(() => {
          this.$toast.fail('上传失败')
          closeLoading(_loading)
        })
    },
    //计算乘法
    multiplicationCom(value, multiplyNumber) {
      let result = 0
      const comResult = multiplicationCom(value, multiplyNumber)
      result = compTo(comResult, 2) // 第三位大于0进1
      return result
    },
    //清除图片
    clearImg(index) {
      // if (this.seeTitle === '查看') {
      //   this.$toast.fail('此图片不能清除')
      //   return false
      // }
      switch (index) {
        case 1:
          // if (this.seeTitle == '打款凭证') {
          //   this.$toast.fail('此图片不能清除')
          //   return ''
          // }
          this.form.imageContract = ''
          break
        case 2:
          // if (this.seeTitle == '打款凭证') {
          //   this.$toast.fail('此图片不能清除')
          //   return ''
          // }
          this.form.moneyCertificatesPlatform = ''
          break
        case 3:
          this.form.moneyCertificatesPerson = ''
      }
    },
    //开票个体户选择 -- 单选
    onConfirm(value) {
      this.showPicker = false
      this.form.drawerName = value.businessName
      this.form.drawerId = value.id
      this.form.invoiceCategoryId = '' //清空开票类目id
      this.form.invoiceCategoryName = '' //清空开票类目名称
    },
    // 查寻个体户得开票类目
    async searchMyTax() {
      const _form = {
        taxItemIds: this.taxItemIds
      }
      const { data } = await apiMyMerchant(_form)
      if (data.code === 1020000 || data.code === 1040400) {
        this.taxItemIdsList = data.content
      } else {
        this.taxItemIdsList = []
      }
    },
    //开票类目选择 --单选
    onSelectTax(value) {
      this.form.invoiceCategoryName = value.taxItemName
      this.form.invoiceCategoryId = value.id
      this.showPicker1 = false
    },
    //查看详情页面
    async seeDetail() {
      if (this.invoiceId) {
        const { data } = await apiSeedetail(this.invoiceId)
        if (data.code === 1020000) {
          this.form = data.content
        }
      }
    },
    // 发请求
    async submitInvoice() {
      const _loading = startLoading()
      let api = ''
      if (this.seeTitle === '修改' || this.seeTitle === '打款凭证') {
        api = apiSupplementEdit
      } else {
        api = apiSubmitFormInvoice
      }
      const _form = {
        wxUserId: this.userWxInfomation.id,
        ...this.form,
        invoiceStatus: 0
      }
      const { data } = await api(_form)
      if (data.code === 1020000) {
        closeLoading(_loading)
        // this.$toast.success('提交成功')
        this.$router.push('/openInvoice/showInvoiceLast')
      } else {
        closeLoading(_loading)
      }
    },
    //表单提交
    async onSubmit() {
      // if (this.seeTitle === '修改' || this.seeTitle === '打款凭证') {
      //   this.supplementSubmit()
      //   return false
      // }
      const { imageContract, moneyCertificatesPlatform } = this.form
      if (!imageContract) {
        this.$toast.fail('未上传合同模板')
        return false
      }
      if (!moneyCertificatesPlatform) {
        this.$toast.fail('请上传打款凭证（给平台）')
        return false
      }
      this.seeDetailInfoInvoice = true //弹出详情
    }
  }
}
</script>

<style scoped lang="stylus">
#openInvoice
  box-sizing border-box
  height 100%
  width 100%
  padding-bottom 20px
  overflow auto
  .my_dialog1
    width 350px
    box-sizing border-box
    padding 0 20px
    p
     margin 10px 0
    .my_inline
      height 1px
      margin 20px auto
      width 100%
      background #909399
  .my_dialog
    width 330px
    padding 5px
    p
     margin 20px
  .invoice_form
    width 100%
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
            box-sizing border-box
            height 80px
            border 1px solid #909399
            img
              width 100%
              height 100%
        .my_text_content
           box-sizing border-box
           width 230px
           padding-top 40px
           height 110px
    .my-textarea
      box-sizing border-box
      width 330px
      /*padding 0 15px*/
      margin 0 auto
    .my_des_text
      width 330px
      margin 0 auto
</style>
