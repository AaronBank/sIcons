/*
 * @Author: your name
 * @Date: 2020-12-11 23:45:52
 * @LastEditTime: 2020-12-11 23:46:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/filters/capitalize.js
 */
export default value => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}
