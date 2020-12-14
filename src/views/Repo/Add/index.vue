<template>
<div class="repo-add">
    <h2 class="repo-add-title">{{ isEdit ? '更新图标库' : '新建图标库' }}</h2>
    <div class="repo-add-table" ref="checkContainer">
        <i-row>
            <i-col span="4">图标库名称</i-col>
            <i-col span="20">
                <i-input size="large" v-model="repoName" v-check="rules.repoName" placeholder="请输入..."></i-input>
            </i-col>
        </i-row>
        <i-row>
            <i-col span="4">图标Icon前缀</i-col>
            <i-col span="20">
                <i-input size="large" v-model="iconPrefix" v-check="{rules: rules.iconPrefix, trigger: 'change'}" placeholder="请输入..."></i-input>
            </i-col>
        </i-row>
        <i-row>
            <i-col span="4">图标库描述</i-col>
            <i-col span="20">
                <i-input size="large" v-model="repoDescription" v-check="rules.repoDescription" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入..."></i-input>
            </i-col>
        </i-row>
    </div>
    <i-button type="success" class="repo-add-submit" :loading="isLoading" @click="submit()">确认提交</i-button>
</div>
</template>

<script>
import validatorRules from './validateRules'
import RepoCache from '@/cache/repo/cache'
import { mapState } from 'vuex'
import {
  Input as IInput,
  Button as IButton,
  Row as IRow,
  Col as ICol
} from 'iview'
export default {
  data () {
    return {
      repoName: '',
      iconPrefix: '',
      repoDescription: '',
      rules: validatorRules,
      isLoading: false,
      isEdit: false
    }
  },
  components: { IInput, IButton, IRow, ICol },
  computed: {
    ...mapState([
      'webUser'
    ])
  },
  methods: {
    submit () {
      this.$checkAll().then(() => {
        // 验证通过后避免重复点击提交
        this.isLoading = true
        const data = {
          repoName: this.repoName,
          iconPrefix: this.iconPrefix,
          repoDescription: this.repoDescription,
          userId: this.webUser.userId,
          repoId: this.$route.params.repoId
        }
        if (this.isEdit) {
          this.cache.updateRepo({
            data: data,
            onload: this.createSuccess.bind(this),
            onerror: function () {
              this.isLoading = false
            }.bind(this)
          })
        } else {
          this.cache.createRepo({
            data: data,
            onload: this.createSuccess.bind(this),
            onerror: function () {
              this.isLoading = false
            }.bind(this)
          })
        }
      }).catch(errors => {
        console.log(errors)
      })
    },
    createSuccess (result) {
      if (result.result) {
        this.$Message.success(result.message || '创建成功！')
        setTimeout(() => {
          this.$router.push({ name: 'userRepoListModule', params: { userId: this.webUser.userId } })
        })
      } else {
        this.isLoading = false
      }
    },
    getRepoInfo () {
      const that = this
      this.cache.getRepoInfo({
        data: {
          repoId: that.$route.params.repoId
        },
        onload (result) {
          if (result.result) {
            that.repoName = result.result.repoName
            that.iconPrefix = result.result.iconPrefix
            that.repoDescription = result.result.repoDescription
          }
        }
      })
    }
  },
  created: function () {
    this.cache = new RepoCache()
    if (this.$route.params.repoId) {
      this.isEdit = true
      this.getRepoInfo()
    }
  }
}
</script>

<style lang="scss">
.repo-add{
    margin: 0 auto;
    width: 960px;
    text-align: center;

    .invalid {
        .ivu-input {
            border-color: #f20;
        }

        .ivu-input:hover {
            box-shadow: 0 0 0 2px rgba(255, 34, 0, 0.1);
        }
    }

    .validation-error{
        position: absolute;
        line-height: 28px;
    }

    &-title{
        font-size: 24px;
    }

    &-table{

        .ivu-row{
            margin-top: 20px;
        }

        .ivu-col-span-4{
            text-align: right;
            height: 42px;
            line-height: 42px;
            font-size:16px;
        }

        .ivu-col-span-20{
            line-height: 42px;
            text-align: left;
            padding-left: 25px;
            position: relative;

        }

        .ivu-input-large{
            height: 42px;
        }
    }

    &-submit{
        margin-top: 40px;
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
}
</style>
