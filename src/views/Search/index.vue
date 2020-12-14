<!--
 * @Author: your name
 * @Date: 2020-12-12 00:39:09
 * @LastEditTime: 2020-12-12 01:15:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/views/Search/index.vue
-->
<template>
<div class="search">
    <div class="search-content">
        <h3 class="title">共<i class="total-count">{{ totalCount }}</i>个相关图标</h3>
        <div class="search-icon-list">
            <icon-list @ongetlist="updateIconCount($event)" :list-opt="listOpt"  ref="iconList" :icon-operator-options="iconControl.iconOperatorOptions"></icon-list>
        </div>
    </div>
</div>
</template>

<script>
import IconList from '@/components/IconList'
export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      listOpt: {
        pageSize: 60,
        pageIndex: 1,
        userId: 'all',
        q: this.$route.params.q
      },
      totalCount: 0,
      iconControl: {
        iconActiveSelected: true,
        iconOperatorOptions: {
          allowCopy: true,
          allowEdit: false,
          allowDelete: false,
          allowDownload: true,
          allowCollect: true
        }
      }
    }
  },
  components: { IconList },
  methods: {
    updateIconCount (result) {
      this.totalCount = (result.query || {}).totalCount || 0
    }
  }
}
</script>

<style lang="scss">
body {
    background: #f8f8f8;
}

.search {
    &-content {
        width: 1200px;
        margin: 0 auto;
        padding: 10px 0 80px;
    }

    &-icon-list {
        width: 1140px;
        margin: 0 auto;
    }

    .common-icon-list-box {
        min-height: 738px;
        margin-top: 0;
    }

    .title {
        line-height: 32px;
        font-size: 16px;
        text-align: left;
        text-indent: 30px;
    }

    .total-count {
        padding: 0 4px;
        font-style: normal;
        font-weight: bold;
        color: #f20;
    }
}
</style>
