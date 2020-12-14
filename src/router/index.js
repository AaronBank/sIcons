/*
 * @Author: your name
 * @Date: 2020-12-11 22:15:33
 * @LastEditTime: 2020-12-11 23:29:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
