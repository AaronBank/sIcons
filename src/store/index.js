/*
 * @Author: your name
 * @Date: 2020-12-11 23:05:37
 * @LastEditTime: 2020-12-11 23:07:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    webUser: {},
    showLoginModal: false,
    loginDialogType: 'login',
    isLogin: window.webUser && window.webUser.userId
  },
  mutations: {
    showLoginModal (state, payload) {
      state.showLoginModal = payload
    },
    loginDialogType (state, payload) {
      state.loginDialogType = payload
    },
    webUser (state, payload) {
      state.webUser = payload
      state.isLogin = payload.userId
      window.webUser = payload
    }
  }
})
