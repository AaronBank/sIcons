<!--
 * @Author: your name
 * @Date: 2020-12-11 22:15:33
 * @LastEditTime: 2020-12-12 00:30:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/App.vue
-->
<template>
  <div>
    <top-bar></top-bar>
    <div class="app-content">
        <router-view :key="currentRouterPath"></router-view>
    </div>
    <login-dialog v-if="showLoginModal"></login-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import TopBar from '@/components/TopBar'
import LoginDialog from '@/components/LoginDialog'
import UserCache from '@/cache/user/cache'
import Clipboard from 'clipboard'
export default {
  name: 'app',
  components: { TopBar, LoginDialog },
  computed: {
    ...mapState([
      'showLoginModal'
    ]),
    // 当用户改变时重新请求数据
    currentRouterPath () {
      return this.$route.fullPath
    }
  },
  methods: {
    onGetUserInfo (result) {
      window.webUser = result.result
      this.$store.commit('webUser', result.result)
    }
  },
  created: function () {
    this.userCache = new UserCache({})
    this.userCache.getCurLoginUserInfo({
      data: {},
      onload: this.onGetUserInfo.bind(this)
    })
    if (!this.clipBoardIns) {
      this.clipBoardIns = new Clipboard('.copy-button', {
        text: function (trigger) {
          return trigger.getAttribute('data-copy')
        }
      })
      this.clipBoardIns.on('success', (e) => {
        this.$Message.success('拷贝成功！')
        e.clearSelection()
      })
      this.clipBoardIns.on('error', function (e) {
        this.$Message.error('此浏览器不支持拷贝，请更换chrome浏览器')
        e.clearSelection()
      })
    }
  }
}
</script>
<style>
/* css reset */
body, input, textarea, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button,  th, td {
    padding: 0;
    margin: 0;
}

html, body, div, form, fieldset, p, h1, h2, h3, h4, h5, h6 {
    -webkit-text-size-adjust: none;
}

html {
    width: 100%;
    height: 100%;
}

body {
    width: 100%;
    font-family: Helvetica, sans-serif;
}

* {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

a {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}

input, textarea, select {
    outline: none;
}

ul{
    list-style: none;
}

.f-fl {
    float: left;
}

.f-fr {
    float: right;
}

.f-cb:after, .f-cbli li:after {
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    content: ".";
}

.f-clearfix:after {
    content: '';
    display: table;
    clear: both;
}

.f-cb, .f-cbli li {
    zoom: 1;
}

.f-cl {
    clear: left;
}

.f-cr {
    clear: right;
}

.f-clr {
    clear: both;
}

.f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.f-hide {
    text-indent: -9999px;
    overflow: hidden;
}

.f-tc {
    text-align: center;
}

.f-tl {
    text-align: left;
}

.f-ib {
    display: inline-block;
    zoom: 1;
    *display: inline;
}

.f-dn {
    display: none;
}

.f-db {
    display: block;
}

.f-pr {
    position: relative;
}

.f-pa {
    position: absolute;
}

.f-pf {
    position: fixed;
}

.f-ohidden {
    overflow: hidden;
}

.f-af {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.f-lh1 {
    line-height: 1;
}

.f-wsn {
    word-wrap: normal;
    white-space: nowrap;
}

.f-pre {
    overflow: hidden;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
}

.f-wwb {
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
}

.f-toe {
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.f-usn {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}

.f-lsn {
    list-style: none;
    margin: 0;
    padding: 0;
}

.f-lsi {
    letter-spacing: -4px;
}

.f-lsi > * {
    letter-spacing: normal;
}

.ivu-form-item-error-tip {
    position: relative;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

.ivu-modal-body {
    min-height: inherit!important;
}
</style>
