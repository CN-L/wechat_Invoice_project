import { apiSearchGarden, apiSearchInvoiceCategory } from '../../api/accountApply'
const acccountApply = {
  namespaced: true,
  state: {
    gardenList: [], //所有园区
    allInvoiceCategory: [] //所有发票类目
  },
  mutations: {
    // 园区
    MUT_GARDEN(state, data) {
      if (data.code === 1020000 || data.code === 1040400) {
        state.gardenList = data.content
      }
    },
    //发票类目
    MUT_INVOICE(state, data) {
      if (data.code === 1020000 || data.code === 1040400) {
        state.allInvoiceCategory = data.content
      } else {
        state.allInvoiceCategory = []
      }
    }
  },
  actions: {
    // 园区
    doSearchGarden({ commit }, form) {
      apiSearchGarden(form)
        .then((res) => {
          const data = res.data
          commit('MUT_GARDEN', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 开票类目
    doInvoiceCategoty({ commit }) {
      apiSearchInvoiceCategory().then((res) => {
        const data = res.data
        commit('MUT_INVOICE', data)
      })
    }
  }
}
export default acccountApply
