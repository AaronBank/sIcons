<!--
 * @Author: your name
 * @Date: 2020-12-11 23:32:39
 * @LastEditTime: 2020-12-11 23:55:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/components/IconRepoList/index.vue
-->
<template>
  <div class="common-icon-repo-list">
    <div class="iconRepo-list" v-if="list.length > 0">
        <icon-repo-card v-for="item in list" :key="item.repoId" :icon-repo="item" :is-owner="true"></icon-repo-card>
    </div>
    <common-empty text="暂无图标库!" v-else></common-empty>
    <div class="list-page"  v-if="totalPageCount > 1">
        <i-page :total="totalCount" :page-size="listOpt.pageSize" @on-change="turnPage($event)"></i-page>
    </div>
  </div>
</template>

<script>
import listViewMixin from '@/mixins/listView'
import RepoCache from '@/cache/repo/cache'
import IconRepoCard from '../IconRepoCard'
import CommonEmpty from '../Empty'
import {
  Page as IPage
} from 'iview'

export default {
  mixins: [listViewMixin],
  data () {
    return {
      list: []
    }
  },
  components: { IconRepoCard, IPage, CommonEmpty },
  props: ['listOpt', 'extOpt'],
  computed: {
    userInfo () {
      return this.$store.state.webUser
    }
  },
  methods: {
    _getCacheInstance () {
      return new RepoCache()
    },
    turnPage (page) {
      this.go(page || 1)
    }
  }
}
</script>

<style lang="scss">
.common-icon-repo-list{
    .iconRepo-list {
        margin-top: 30px;
    }

    .list-page {
        text-align: center;
    }
}
</style>
