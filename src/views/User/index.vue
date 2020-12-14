<!--
 * @Author: your name
 * @Date: 2020-12-12 00:49:16
 * @LastEditTime: 2020-12-12 01:24:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/views/User/index.vue
-->
<template>
<div class="user-page">
    <div class="user-info">
        <div class="user-info-bg" p-id="19">
            <div class="user-info-bg-wrap wrap">
                <div class="planet planet-9"></div>
                <div class="planet planet-10"></div>
                <div class="planet planet-11"></div>
                <div style="display: none;" class="planet planet-12" ></div>
            </div>
        </div>
        <div class="user-info-box">
            <div class="user-info-avatar">
                <img class="head" v-if="user.avatar" :src="user.avatar">
                <img class="cover" src="https://gw.alicdn.com/tps/TB1W_X6OXXXXXcZXVXXXXXXXXXX-400-400.png" alt="">
            </div>
            <div class="user-info-detail">
                <span class="name">
                    {{ user.userName }}
                </span>
                <div class="repo-tabs f-cb">
                    <i-menu class="f-fl" mode="horizontal" :active-name="currentRouterPathName"  @on-select="changeTab($event)">
                        <i-menu-item :key="item.name" v-for="item in tabs" :name="item.name">{{ item.label }}</i-menu-item>
                    </i-menu>
                </div>
            </div>
        </div>
    </div>
    <div class="user-page-detail">
        <router-view :key="currentRouterPath"></router-view>
    </div>
</div>
</template>

<script>
import UserCache from '@/cache/user/cache'
import {
  Menu as IMenu,
  MenuItem as IMenuItem
} from 'iview'
export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      tabs: [
        {
          label: '图标库',
          name: 'userRepoListModule',
          content: '图标库'
        },
        {
          label: '图标',
          name: 'userIconListModule',
          content: '图标'
        }
      ],
      user: {}
    }
  },
  components: { IMenu, IMenuItem },
  computed: {
    userInfo () {
      return this.$store.state.webUser
    },
    currentRouterPathName () {
      return this.$route.name || this.tabs[0].name
    },
    currentRouterPath () {
      return this.$route.fullPath
    },
    isOwner () {
      return this.userInfo.userId === this.user.userId
    }
  },
  methods: {
    changeTab (name) {
      this.$router.push({ name: name })
    }
  },
  created () {
    this.cache = new UserCache({})
    // 只有公开的path才会带userId
    if (this.$route.params.userId) {
      this.cache.getUserInfo({
        data: {},
        params: {
          userId: this.$route.params.userId
        },
        onload: function (result) {
          this.user = result.result
        }.bind(this)
      })
    }
  }
}
</script>

<style lang="scss">
.user-page {
    padding-bottom: 120px;

    .common-icon-list-box {
        min-height: 246px;
    }

    .user-info {
        margin: 0 auto;
        color: #fff;
        position: relative;

        &-bg {
            background: rgb(40, 43, 51);
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            overflow: hidden;
            z-index: -1;

            &-wrap {
                position: relative;
                top: 0;
                height: 100%;
                left: 0;
                width: 1360px;
                margin: 0 auto;
            }

            .planet {
                width: 110px;
                height: 110px;
                left: 132px;
                top: 180px;
                opacity: .15;
                background: linear-gradient(0deg,#ff5a25,#ff005a);
                z-index: 999;
                position: absolute;
                border-radius: 50%;
            }

            .planet-10 {
                width: 60px;
                height: 60px;
                left: 432px;
                top: 30px;
                background: linear-gradient(0deg, #ff314f, #ff1be6);
            }

            .planet-11 {
                width: 110px;
                height: 110px;
                left: 1032px;
                top: 70px;
                background: linear-gradient(0deg, #5821ff, #aaa8ff);
            }

            .planet-12 {
                width: 60px;
                height: 60px;
                left: 1532px;
                top: 140px;
                background: linear-gradient(0deg, #ff314f, #ff1be6);
            }
        }

        &-box {
            padding: 60px 0 0 0;
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: left;
        }

        &-avatar {
            width: 130px;
            height: 130px;
            position: relative;
            background: url(https://gw.alicdn.com/tps/TB1W_X6OXXXXXcZXVXXXXXXXXXX-400-400.png) center center / cover no-repeat;

            .head {
                width: 86px;
                height: 86px;
                border-radius: 50%;
                margin-top: 15px;
                margin-left: 22px;
            }

            .cover {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        }

        &-detail {
            padding-top: 40px;
            flex: 1;
            text-align: left;

            .name {
                font-size:24px;
                line-height: 22px;
                padding-left: 20px;
            }

            .repo-tabs {
                margin-bottom: -1px;
                margin-top: 17px;
                width: 100%;

                .ivu-menu-horizontal {
                    background: none;
                    color: #fff;
                    height: 50px;
                    line-height: 50px;
                }

                .ivu-menu-horizontal.ivu-menu-light:after {
                    display: none;
                }

                .ivu-menu-item {
                    color: #fff;
                    font-size: 16px;
                }

                .ivu-menu-item:hover, .ivu-menu-item-active, ivu-menu-item-selected {
                    border-bottom: 3px solid #fff;
                }

                .tab-item {
                    height: 50px;
                    width: 50px;
                    line-height: 50px;
                    color: #fff;
                    font-size: 24px;
                    border-radius: 50%;
                    background: #9266f9;
                    margin-left: 20px;
                    position: relative;
                    bottom: -25px;
                    text-align: center;
                }
            }
        }
    }

    &-detail {
        width:  1200px;
        margin: 0 auto;
        padding-top: 40px;
        position: relative;

        .ivu-menu-item {
            text-align: right;
            font-size: 14px;
        }

        .ivu-menu-item:hover {
            background: none;
            color: #336;
        }

        .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
            color: #336;
            border-right: 3px solid #fff;
        }

        .ivu-col-span-20 {
            text-align: left;
            padding-left: 80px;

            .title {
                font-size: 24px;
                color: #336;
                line-height: 24px;
                height: 24px;
                font-weight: normal;

                .count {
                    font-size: 14px;
                    color: #ccc;
                }
            }

            .iconRepo-list {
                margin-top: 30px;
            }

            .list-page {
                text-align: center;
            }
        }
    }
}
</style>
