/*
 * @Author: your name
 * @Date: 2020-12-11 23:48:31
 * @LastEditTime: 2020-12-12 00:17:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/filters/index.js
 */
import requireContext from '@/utils/requireContext'

export default (Vue) => {
  requireContext(require.context('./lib/', false, /\.js$/), (name, fn) => {
    Vue.filter(name, fn)
  })
}
