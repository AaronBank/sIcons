/*
 * @Author: your name
 * @Date: 2020-12-11 23:46:30
 * @LastEditTime: 2020-12-11 23:46:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/filters/toDate.js
 */
export default value => {
  value = value || new Date()
  return new Date(value).toLocaleDateString()
}
