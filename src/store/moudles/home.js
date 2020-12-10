import { apiWxLogin } from '../../api/home'
import { apiLogin, apiRefreshToken } from '../../api/login'
import { Base64 } from 'js-base64'
const home = {
  namespaced: true, //模块复用
  state: {
    token: JSON.parse(sessionStorage.getItem('token')) || '', // token
    user: JSON.parse(sessionStorage.getItem('user')) || {}, // 用户信息
    userWxInfomation: JSON.parse(sessionStorage.getItem('userWxInfomation')) || {} // 用户信息
  },
  mutations: {
    MUT_LOGIN(state, data) {
      if (data.code === 1020000) {
        state.userWxInfomation = data.content //个人信息
        sessionStorage.setItem('userWxInfomation', JSON.stringify(data.content))
      }
    },
    /* 个人登录信息 */
    MUT_DOLOGIN(state, { res }) {
      const { data, headers } = res
      if (data.code === 1020000) {
        const { authorization } = headers
        const result = authorization.slice(7).split('.')
        state.token = {
          authorization: authorization,
          base1: Base64.decode(result[0]),
          base2: Base64.decode(result[1])
        }
        console.log(state.token)
        if (data.content) { // 用户信息
          state.user = data.content
          sessionStorage.setItem('user', JSON.stringify(data.content))
        }
        console.log(state.user, '登录token')
        sessionStorage.setItem('token', JSON.stringify(state.token))
      }
    }

  },

  actions: {
    wxlogin({ commit }, form) {
      apiWxLogin(form).then((res) => {
        const data = res.data
        commit('MUT_LOGIN', data)
      })
    },
    // 获取token
    doLogin({ commit }, form) {
      return new Promise((resolve, reject) => {
        apiLogin(form).then((res) => {
          commit('MUT_DOLOGIN', { res })
          resolve(res)
        })
      })
    },
    /* 获取token */
    doRefreshToken({ commit }) {
      return new Promise((resolve, reject) => {
        apiRefreshToken().then((res) => {
          const data = res.data
          commit('MUT_DOLOGIN', { res })
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
export default home
