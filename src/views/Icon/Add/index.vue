<!--
 * @Author: your name
 * @Date: 2020-12-12 00:52:02
 * @LastEditTime: 2020-12-12 00:53:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/views/Icon/List/index.vue
-->
<template>
<div class="user-icon-add">
    <h3 class="add-title">图标草稿上传 <span class="add-count">已上传{{ totalCount }}个图标</span></h3>
    <icon-add @onaddicon="updateIconList"></icon-add>
    <icon-list :icon-operator-options="iconOperatorOptions" ref="iconList" @ongetlist="updateIconCount($event)" :list-opt="listOpt" :ext-opt="extOpt" empty-text="暂无草稿图标！"></icon-list>
    <div class="operator-box">
        <p v-if="totalCount > 0 && $route.params.repoId" class="submit-tip">注意：本次保存上传将会直接添加到图标库: 《{{ $route.params.repoName }}》中，中文图标名称会转为拼音</p>
        <p v-if="totalCount > 0 && !$route.params.repoId" class="submit-tip normal">提示：中文图标名称会转为拼音！</p>
        <div class="operate-box" v-if="totalCount > 0">
            <i-button  type="success" class="submit" @click="submit(true)">去除颜色上传</i-button>
            <i-button type="success" class="submit submit-colorful" @click="submit()">保留颜色上传</i-button>
        </div>
    </div>
</div>
</template>

<script>
import IconAdd from '@/components/IconAdd'
import IconList from '@/components/IconList'
import IconCache from '@/cache/icon/cache'
import {
  Button as IButton
} from 'iview'
export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      getListTimer: null,
      disabledSubmitBtn: false,
      listOpt: {
        pageSize: 500
      },
      extOpt: {
        reqType: 'draft'
      },
      totalCount: 0,
      iconOperatorOptions: {
        allowCopy: true,
        allowEdit: true,
        allowDelete: true,
        allowDownload: true,
        allowCollect: false
      }
    }
  },
  components: { IconAdd, IconList, IButton },
  methods: {
    updateIconCount (result) {
      this.totalCount = (result.query || {}).totalCount || 0
    },
    updateIconList () {
      clearTimeout(this.getListTimer)
      this.getListTimer = setTimeout(function () {
        this.$refs.iconList.getList()
      }.bind(this), 300)
    },
    submit (resetColor) {
      this.disabledSubmitBtn = true
      this.cache.submitIconDraft2Icon({
        data: {
          repoId: this.$route.params.repoId,
          resetColor: resetColor
        },
        onload: this.submitSuccess.bind(this)
      })
    },
    submitSuccess (result) {
      this.disabledSubmitBtn = false
      if (result.result) {
        this.$Message.success('提交成功!')
        setTimeout(() => {
          if (this.$route.params.repoId) {
            this.$router.push({ name: 'userRepoDetailModule', params: { repoId: this.$route.params.repoId } })
          } else {
            this.$router.push({ name: 'userIconListModule' })
          }
        }, 500)
      } else {
        this.$Message.error(result.message)
      }
    }
  },
  created () {
    this.cache = new IconCache({})
  }
}
</script>

<style lang="scss">
.user-icon-add {

    .add-title {
        font-size: 24px;
        color: #336;
        line-height: 24px;
        height: 24px;
        font-weight: normal;
    }

    .add-count {
        font-size: 14px;
        color: #ccc;
    }

    .operator-box {
        margin: 40px auto;
    }

    .submit-tip {
        font-size: 12px;
        color: #f20;
        line-height: 24px;
        text-align: center;
    }

    .normal {
        color: #999;
    }

    .operate-box {
        display: flex;
        justify-content: center;
    }

    .submit{
        display: block;
        width: 160px;
        background: rgb(40, 43, 51);
        color: #fff;
        height: 44px;
        font-size: 16px;
        border: 1px solid rgb(40, 43, 51);

        &:hover{
            border: 1px solid #494993;
            background: #494993;
            color: #fff;
        }
    }

    .submit-colorful {
        margin-left: 30px;
        background: #f20;
        color: #fff;
        border: 1px solid #f20;

        &:hover{
            border: 1px solid #f20;
            background: #f22;
            color: #fff;
        }
    }
}
</style>
