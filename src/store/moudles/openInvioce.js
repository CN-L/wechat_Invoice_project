import { apiAllTaxItems } from '../../api/openInvoice'
const openInvoice = {
  namespaced: true,
  state: {
    allInvoiceTaxItems: [] //开票类目
  },
  mutations: {
    MUT_ALL_TAXITEMS(state, data) {
      if (data.code === 1020000 || data.code === 1040400) {
        state.allInvoiceTaxItems = data.content
      } else {
        state.allInvoiceTaxItems = []
      }
    }
  },
  actions: {
    doAllTaxItems({ commit }, form) {
      return new Promise((resolve, reject) => {
        apiAllTaxItems(form)
          .then((res) => {
            const data = res.data
            commit('MUT_ALL_TAXITEMS', data)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
export default openInvoice
