<!--
 * @Author: your name
 * @Date: 2020-12-12 00:52:02
 * @LastEditTime: 2020-12-12 00:54:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/views/Icon/List/index.vue
-->
<template>
<div class="user-icon-list">
    <div class="list-operator f-cb">
        <h3 class="list-title f-fl"><span class="list-count">共{{ totalCount }}个图标</span></h3>
        <div class="user-icon-search f-fr">
            <search-input @search="search($event)" placeholder="搜索我的图标"></search-input>
        </div>
    </div>
    <icon-list @ongetlist="updateIconCount($event)" :list-opt="listOpt" :icon-operator-options="iconOperatorOptions" ref="userIconList"></icon-list>
</div>
</template>

<script>
import IconList from '@/components/IconList'
import searchInput from '@/components/SearchInput'

export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      listOpt: {
        pageSize: 60,
        userId: this.$route.params.userId,
        q: ''
      },
      totalCount: 0
    }
  },
  components: { IconList, searchInput },
  computed: {
    userInfo () {
      return this.$store.state.webUser
    },
    iconOperatorOptions () {
      return {
        allowCopy: true,
        allowEdit: false,
        allowDelete: this.userInfo.userId === parseInt(this.$route.params.userId),
        allowDownload: true,
        allowCollect: true
      }
    }
  },
  methods: {
    updateIconCount (result) {
      this.totalCount = (result.query || {}).totalCount || 0
    },
    search (q) {
      this.listOpt.q = q
      this.listOpt.pageIndex = 1
      this.$refs.userIconList.getList()
    }
  }
}
</script>

<style lang="scss">
.user-icon-list {
    width: 1140px;
    margin: 0 auto;

    .common-icon-list-box {
        margin-top: 0;
    }

    .list-title {
        font-size: 24px;
        color: #336;
        line-height: 24px;
        height: 24px;
        font-weight: normal;
    }

    .list-count {
        font-size: 14px;
        color: #ccc;
    }

    .user-icon-search {
        margin-right: 14px;
    }

    .common-search-input {

        .ivu-input {
            border: 1px solid #dddee1;
        }
    }

    .item-add, .operator-all, .add2lib {
        color: #333;
        font-size: 14px;
        height: 32px;
        line-height: 32px;

        &:hover{
            cursor: pointer;
        }
    }

    .operator-all, .add2lib, .lib-list {
        margin-right: 10px;
    }

    .operator-fill-items {
        margin-top: 30px;
        min-height: 33px;
        position: relative;

        .btn {
            display: inline-block;
            padding: 0 20px;
            height: 32px;
            line-height: 30px;
            border: 1px solid transparent;
            border-radius: 20px;
            text-align: center;
            white-space: nowrap;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            box-sizing: border-box;
            color: #333;
            background-color: #ddd;
            margin-right: 15px;
        }

        .lib-list {
            border-radius: 0px;
            background: #fff;
            color: #333;
            padding: 0;
            position: relative;
            border: none;
            width: 130px;

            .text {
                color: #333;
            }

            .ivu-select-dropdown {
                left: 0;
                right: 0;
            }
        }

        .select-all {
            background: #fff;
        }
    }
}
</style>
