<!--
 * @Author: your name
 * @Date: 2020-12-12 00:55:52
 * @LastEditTime: 2020-12-12 00:56:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/views/Repo/List/index.vue
-->
<template>
<div class="user-repo-list">
    <div class="repo-list-operator f-cb">
        <h3 class="title f-fl"><span class="count">共{{ totalCount}}个图标库</span></h3>
    </div>
    <icon-repo-list @ongetlist="updateRepoCount($event)" :list-opt="listOpt"></icon-repo-list>
</div>
</template>

<script>
import IconRepoList from '@/components/IconRepoList'
export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      listOpt: {
        pageSize: 8,
        pageIndex: 1,
        userId: this.$route.params.userId
      },
      totalCount: 0
    }
  },
  components: { IconRepoList },
  computed: {
    userInfo () {
      return this.$store.state.webUser
    }
  },
  methods: {
    changeTab (name) {
      this.$router.push({ name: name })
    },
    updateRepoCount (result) {
      this.totalCount = (result.query || {}).totalCount || 0
    }
  }
}
</script>

<style lang="scss">
.user-repo-list {
    width: 1140px;
    margin: 0 auto;

    .common-icon-repo-card {
        margin-right: 14px;
    }

    .common-icon-repo-card:nth-child(4n) {
        margin-right: 0;
    }

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
        text-align: left;
    }

    .user-create-btn {
        color: #333;
        font-size: 14px;

        &:hover{
            cursor: pointer;
        }
    }
}
</style>
