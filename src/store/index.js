import Vue from 'vue'
import Vuex from 'vuex'
import home from './moudles/home'
import accountApply from './moudles/accountApply'
import openInvoice from './moudles/openInvioce'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    accountApply,
    openInvoice
  }
})
