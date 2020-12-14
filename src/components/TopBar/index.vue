<!--
 * @Author: your name
 * @Date: 2020-12-12 00:21:35
 * @LastEditTime: 2020-12-12 01:29:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/components/TopBar/index.vue
-->
<template>
<header class="top-bar head">
    <div class="top-bar-center">
        <a href="/" class="top-bar-icon icon-flashlight-fill f-fl"></a>
        <ul class="top-bar-menu f-fl">
            <li v-for="(item, index) in menuList" class="top-bar-menu-item f-fl" :key="index" :class="getActiveTab(item.moduleName)" @click="goModule(item.moduleName, item.noNeedLogin)">
                <span class="text">{{ item.text }}</span>
            </li>
        </ul>
        <div class="top-bar-user f-fr">
            <div v-if="isLogin" class="top-bar-user-info">
                <Poptip trigger="hover" placement="bottom">
                    <a href="#" class="user icon-people-fill"></a>
                    <div slot="title">
                        <p class="title">欢迎使用！</p>
                    </div>
                    <div slot="content">
                        <ul class="entrance">
                            <!--<li class="entrance-item">-->
                                <!--<a href="">个人设置</a>-->
                            <!--</li>-->
                            <li @click="logout" class="entrance-item">
                                <a>退出</a>
                            </li>
                        </ul>
                    </div>
                </Poptip>
            </div>
            <div v-else class="top-bar-user-login f-cb">
                <a v-if="userInfo.loginUrl" class="login" :href="userInfo.loginUrl" target="_self">登录</a>
                <template v-else>
                    <span class="login" @click="login('login')">登录</span>
                    <span class="register" @click="login('register')">注册</span>
                </template>
            </div>
        </div>
        <div class="top-bar-search f-fr" v-if="showSearchInput">
            <search-input @search="search($event)" :init-value="q"></search-input>
        </div>
    </div>
</header>
</template>

<script>
import UserCache from '@/cache/user/cache'
import { Poptip } from 'iview'
import { mapState } from 'vuex'
import searchInput from '../SearchInput'
export default {
  name: 'hello',
  components: { Poptip, searchInput },
  data () {
    return {
      title: 'Welcome to Icon App',
      menuList: [
        {
          moduleName: 'indexHello',
          text: '首页',
          noNeedLogin: true
        },
        {
          moduleName: 'userRepoListModule',
          text: '我的图标库'
        },
        {
          moduleName: 'userRepoAddModule',
          text: '创建图标库'
        },
        {
          moduleName: 'userIconListModule',
          text: '我的图标'
        },
        {
          moduleName: 'userIconAddModule',
          text: '上传图标'
        },
        {
          moduleName: 'docsIntroduce',
          text: '帮助文档',
          noNeedLogin: true
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ]),
    userInfo () {
      return this.$store.state.webUser
    },
    userPageInfoId () {
      return parseInt(this.$route.params.userId)
    },
    currentModuleName () {
      return this.$route.name
    },
    showSearchInput () {
      return this.currentModuleName !== 'indexHello'
    },
    q () {
      return this.$route.params.q
    }
  },
  methods: {
    login (type) {
      this.$store.commit('loginDialogType', type)
      this.$store.commit('showLoginModal', true)
    },
    logout () {
      this.cache.logout({
        data: {},
        onload: function (result) {
          this.$store.commit('webUser', result.result)
        }.bind(this)
      })
    },
    // tab active only is owner of current repo
    getActiveTab (moduleName) {
      if (this.currentModuleName === moduleName && this.userPageInfoId === this.userInfo.userId) {
        return 'active'
      } else {
        return ''
      }
    },
    /**
         * 功能
         *
         * @param    {String}           moduleName                  module name
         * @param    {Boolean}          noNeedLogin                 no need pre login
         * @return   {void}
         */
    goModule (moduleName, noNeedLogin) {
      if (this.userInfo.userId || noNeedLogin) {
        this.$router.push({ name: moduleName, params: { userId: this.userInfo.userId } })
      } else if (this.userInfo.loginUrl) {
        window.open(this.userInfo.loginUrl, '_self')
      } else {
        this.login('login')
      }
    },

    search (value) {
      this.$router.push({ name: value ? 'searchQ' : 'search', params: { q: value } })
    }
  },
  created () {
    this.cache = new UserCache({})
  }
}
</script>

<style lang="scss">
@mixin menuItemSelected {
    content: '';
    height: 1px;
    color: #ff3c10;
    background: #ff3c10;
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 2px;
}
.top-bar{
    color: #fff;
    height: 60px;
    background: rgb(40, 43, 51);

    &-center{
        width: 1160px;
        margin: 0 auto;
    }

    &-icon{
        height: 60px;
        font-size: 40px;
        color: #fff;
        line-height: 60px;
    }

    &-menu{
        margin-left: 40px;

        .active:after {
            @include menuItemSelected;
        }

        &-item{
            height: 60px;
            padding: 0 15px;
            font-size: 16px;
            position: relative;

            .text{
                display: block;
                color: #ddd9db;
                line-height: 60px;
                cursor: pointer;

                &:hover{
                    color: #fff;
                    &:after {
                        @include menuItemSelected;
                    }
                }
            }
        }
    }

    &-user{
        height: 60px;
        font-size: 28px;
        padding: 0 15px;
        color: #fff;
        line-height: 60px;

        a {
            color: #fff;
        }

        .user {
            position: relative;
            top: 3px;
        }

        &-login {
            font-size: 0;

            span, a {
                font-size: 16px;
                padding: 0 8px;
                cursor: pointer;
            }
        }

        .title {
            color: #495060;
            font-size: 12px;
            text-align: left;
            padding: 2px 10px 2px 10px;
        }

        .entrance {
            &-item {

                a {
                    display: block;
                    font-size: 12px;
                    color: #495060;
                    height: 32px;
                    line-height: 32px;
                    text-align: left;
                    padding: 2px 10px 2px 10px;
                }

                a:hover {
                    background-color: #F3F4F6;
                }
            }
        }
    }

    &-search {
        width: 180px;
        height: 60px;
        display: flex;
        align-items: center;

        .common-search-input {
            border-radius: 20px;
            overflow: hidden;
            width: 100%;
            border: 1px solid #fff;
            height: 28px;
        }

        .ivu-input {
            background: none;
            color: #fff;
            padding: 4px 12px;
            font-size: 12px;
            height: 26px;
        }

        .ivu-btn {
            padding: 0 12px;
        }

        .ivu-input-group-append {
            background: none;
            border: none;
            color: #fff;
        }
    }
}
</style>
