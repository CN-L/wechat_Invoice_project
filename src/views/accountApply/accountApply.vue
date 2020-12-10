<template>
  <div id="accountApply">
    <!--第一步-->
    <steps-first :status="status" v-show="steps === 1" :sub_this="sub_this" @nextSteps="nextSteps" :form.sync="form"></steps-first>
    <!--第二步-->
    <steps-second v-show="steps === 2" :sub_this="sub_this" @nextSteps="nextSteps" :form="form"></steps-second>
    <!--第三步-->
    <steps-third v-show="steps === 3" :sub_this="sub_this" @nextSteps="nextSteps" :form="form"></steps-third>
  </div>
</template>

<script>
import stepsFirst from '@/components/accountApply/steps-first.vue'
import stepsSecond from '@/components/accountApply/steps-second.vue'
import stepsThird from '@/components/accountApply/steps-third.vue'
import { apiRegister, apiRegisterContinue, apiCancelApply } from '../../api/accountApply'
import { apiContinueSubmit } from '../../api/accountProgress'
import { mapActions, mapState } from 'vuex'
import { startLoading, closeLoading } from '../../utils/loading'
export default {
  name: 'accountApply',
  data() {
    return {
      steps: 1, //步骤条进度
      sub_this: this, //绑定this
      gardenList: [], //所有园区
      form: {
        signCompany: '', //签约公司
        gardenId: '',
        wxUserInfoId: '',
        gardenName: '',
        name: '',
        idNo: '',
        mobile: '',
        bankName: '',
        bankNumber: '',
        imageFace: '',
        imageBack: '',
        imageIdentification: '',
        taxItemIds: '',
        imageBusinessAuthentication: '',
        imageRevenueAuthentication: '',
        imageAttorney: ''
      }
    }
  },
  mounted() {
    this.supplementSubmit() //继续提交表单
    this.doSearchGarden()
    this.doInvoiceCategoty()
    this.form.signCompany = this.userWxInfomation.crmCustomerName || ''
  },
  computed: {
    status() {
      return Number(this.$route.query.status)
    },
    accId() {
      return this.$route.query.id
    },
    ...mapState('home', ['userWxInfomation'])
  },
  components: {
    stepsFirst,
    stepsSecond,
    stepsThird
  },
  methods: {
    ...mapActions('accountApply', ['doSearchGarden', 'doInvoiceCategoty']),
    // 第一步
    nextSteps(index) {
      switch (index) {
        case 1:
          this.nextSteps_first()
          break
        case 2:
          this.nextSteps_second()
          break
        case 3:
          this.$router.push('/accountProgress')
          break
        case 4:
          this.commitProgress() //取消申请
      }
    },
    // 校验
    async nextSteps_first() {
      if (this.status === 1) {
        this.steps = 2
        return false
      }
      const { imageIdentification, imageFace, imageBack } = this.form
      if (!imageIdentification || !imageFace || !imageBack) {
        this.$toast.fail('上传图片信息不完整')
        return false
      }
      const _form = {
        ...this.form,
        wxUserInfoId: this.userWxInfomation.id
      }
      const loading = startLoading()
      const { data } = await apiRegister(_form)
      if (data.code === 1020000) {
        closeLoading(loading)
        this.form = data.content
        this.steps = 2
        this.$toast.success('提交成功')
      } else {
        closeLoading(loading)
      }
    },
    // 第二步
    async nextSteps_second() {
      const { imageBusinessAuthentication, imageRevenueAuthentication } = this.form
      if (!imageBusinessAuthentication || !imageRevenueAuthentication) {
        this.$toast.fail('上传图片信息不完整')
        return false
      }
      const _form = {
        ...this.form,
        applyStatus: 1,
        wxUserInfoId: this.userWxInfomation.id
      }
      const { data } = await apiRegisterContinue(_form)
      const loading = startLoading()
      if (data.code === 1020000) {
        closeLoading(loading)
        this.form = data.content
        this.steps = 3 //进入第三步
        this.$toast.success('提交成功')
      } else {
        closeLoading(loading)
      }
    },
    // 补充表单 -- 开户进度进入
    async supplementSubmit() {
      if (this.status !== 1) {
        return false
      }
      const _form = {
        accId: this.accId
      }
      const { data } = await apiContinueSubmit(_form)
      if (data.code === 1020000 || data.code === 1040400) {
        this.form = data.content
      }
    },
    //取消申请
    async commitProgress() {
      const _form = {
        ...this.form,
        applyStatus: 4,
        wxUserInfoId: this.userWxInfomation.id
      }
      const { data } = await apiCancelApply(_form)
      if (data.code === 1020000) {
        this.$toast.success('提交成功')
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
#accountApply
  box-sizing border-box
  width 100%
  height 100%
</style>
