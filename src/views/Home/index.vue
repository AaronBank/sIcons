<template>
<div class="index-index-hello">
    <div class="index">
        <div class="index-icon icon-flashlight-fill" ></div>
        <div class="index-search">
            <search-input @search="search($event)"></search-input>
        </div>
        <div class="index-repo-list">
            <icon-repo-list :list-opt="listOpt" :ext-opt="extOpt"></icon-repo-list>
        </div>
    </div>
</div>

</template>

<script>
import IconRepoList from '@/components/IconRepoList'
import SearchInput from '@/components/SearchInput'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Icon Library',
      value: '',
      listOpt: {
        pageSize: 8,
        pageIndex: 1,
        userId: 'all'
      },
      extOpt: {
        reqType: 'recommend'
      }
    }
  },
  components: { IconRepoList, SearchInput },
  methods: {
    search (value) {
      this.$router.push({ name: 'searchQ', params: { q: value } })
    }
  }
}
</script>

<style lang="scss">
.index-index-hello{
    .index{
        margin: 100px auto 0;
        color: #336;

        .common-search-input {
            border: 1px solid #336;
            border-radius: 25px;
            overflow: hidden;
        }

        .ivu-input {
            font-size: 16px;
            text-align: center;
            height: 50px;
        }

        .ivu-input-group-append {
            background: #336;
            border: 1px solid #336;
            color: #fff;
            font-size: 17px;
            padding: 0 12px;

            .ivu-btn {
                font-size: 26px;
            }
        }
    }

    .index-search {
        width: 766px;
        height: 50px;
        margin: 0 auto;
    }

    .index-icon {
        font-size: 120px;
    }

    .index-repo-list {
        width: 1200px;
        margin: 60px auto 120px;
        text-align: left;
    }
}

</style>
