<template>
<div class="user-repo-detail">
    <div class="repo-detail f-cb">
        <div class="base-info f-fl">
            <span class="repo-name info-item">
            <span class="label icon-group"></span>
            {{ repo.repoName }}
        </span>
            <span class="repo-prefix info-item">
           <span class="label icon-flag"></span>
            {{ repo.iconPrefix }}
        </span>
            <span class="repo-icon-count info-item">
            <span class="label icon-stealth"></span>
            {{ (repo.iconIds || {}).length || 0 }}
        </span>
        </div>
        <div class="repo-operator f-fr" v-if="repo.isMember || repo.isOwner">
            <div class="repo-operator-privilege f-fr"  v-if="repo.isMember || repo.isOwner">
                <i-button class="add-icon  f-fr" @click="showIconListDialog=!showIconListDialog">添加图标</i-button>
                <i-button v-if="repo.isOwner && !member.addMemberStatus" class="add-member  f-fr" @click="member.addMemberStatus=true">添加成员</i-button>
                <div class="add-member-box  f-fr" v-if="member.addMemberStatus">
                    <i-input v-model="member.account" class="member-input" >
                        <i-select class="member-select" v-model="member.accountType" slot="prepend">
                            <i-option v-for="(item, index) in member.typeList" :key="index" :value="item.value">{{ item.text }}</i-option>
                        </i-select>
                        <i-button slot="append" @click="addMember">添加</i-button>
                    </i-input>
                </div>
                <i-button :loading="isSyncRepo" v-if="repo.unSync" type="success" class="repo-sync f-fr" @click="syncRepo()">保存更新</i-button>
                <router-link :to="{name: 'userRepoEditModule', params: { repoId: repo.repoId}}">
                    <i-button v-if="repo.isOwner" type="success" class="add-icon f-fr">编辑</i-button>
                </router-link>
            </div>
            <div class="repo-icon-search f-fr">
                <search-input @search="search($event)" placeholder="搜索图标库图标"></search-input>
            </div>
        </div>
    </div>
    <div class="repo-css">
        <i-input v-model="repo.cssUrl" class="css-input" >
            <i-button class="copy-button" slot="prepend" :data-copy="repo.cssUrl">复制链接</i-button>
        </i-input>
    </div>
    <div class="user-icon-list">
        <icon-list :copy-text-prefix="repo.iconPrefix + '-'" :list-opt="listOpt" ref="repoIconList" :icon-operator-options="iconControl.iconOperatorOptions" @delete-icon="deleteIcon($event)"></icon-list>
    </div>
    <div v-if="showIconListDialog">
        <modal
            class="unique-icon-list"
            v-model="showIconListDialog"
            title="选择需要添加的图标"
            ok-text="确认添加"
            cancel-text="取消"
            @on-ok="addIconToRepo"
            width="610">
            <div class="add-operator">
                <i-checkbox v-model="selectedAllIconFlag" @on-change="selectAllIcon()">全选</i-checkbox>
                <router-link :to="{name: 'userIconAdd2RepoModule', params: { repoId: repo.repoId, repoName: repo.repoName}}">
                    从电脑上传
                </router-link>
                <div class="repo-icon-search f-fr">
                    <search-input @search="uniqueSearch($event)" placeholder="搜索我的图标"></search-input>
                </div>
            </div>
            <icon-list class="unique-icon-list" ref="addIconListRef"
                :list-opt="listOptUnique"
                empty-text="暂无可添加稿图标！"
                :icon-active-selected="iconControl.iconActiveSelected"
            ></icon-list>
        </modal>
    </div>
</div>
</template>

<script>
import IconList from '@/components/IconList'
import SearchInput from '@/components/SearchInput'
import RepoCache from '@/cache/repo/cache'
import {
  Modal,
  Input as IInput,
  Select as ISelect,
  Option as IOption,
  Button as IButton,
  Checkbox as ICheckbox
} from 'iview'

/**
 *  showIconListDialog=false            显示添加图标弹框
 *  listOpt                             字体图标列表参数
 *  listOptUnique                       字体图标列表去重参数
 *  totalCount                          该仓库下的图标总数
 *  repo                                仓库信息对象
 *  repo.iconIds                        仓库下所有图标id数组
 *  repo.unSync                         仓库是否更新到最新
 *  iconControl                         图标卡片操作控制项对象
 *  iconControl.iconActiveSelected      图标是否可以被选中
 *  iconControl.iconOperatorOptions     控制图标操作项显示
 *  isSyncRepo                          是否正在同步仓库数据
 *  addMemberStatus                     添加成员按钮状态
 */

/* 添加成员输入类型-用户ID */
const MEMBER_ACCOUNT_TYPE_USER_ID = 1

/* 添加成员输入类型-邮箱 */
const MEMBER_ACCOUNT_TYPE_USER_NAME = 5

export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      listOpt: {
        pageSize: 60,
        pageIndex: 1,
        userId: this.$route.params.userId,
        repoId: (this.$route.params || {}).repoId
      },
      totalCount: 0,
      repo: {},
      showIconListDialog: false,
      selectedAllIconFlag: false,
      isSyncRepo: false,
      member: {
        addMemberStatus: false,
        accountType: MEMBER_ACCOUNT_TYPE_USER_NAME,
        typeList: [
          {
            value: MEMBER_ACCOUNT_TYPE_USER_NAME,
            text: '用户名称'
          },
          {
            value: MEMBER_ACCOUNT_TYPE_USER_ID,
            text: '用户Id'
          }
        ],
        account: ''
      }
    }
  },
  components: { IconList, Modal, IInput, ISelect, IOption, IButton, ICheckbox, SearchInput },
  computed: {
    userInfo () {
      return this.$store.state.webUser
    },
    listOptUnique () {
      return {
        pageSize: 500,
        pageIndex: 1,
        userId: this.userInfo.userId,
        repoId: (this.$route.params || {}).repoId,
        unique: true
      }
    },
    iconControl () {
      return {
        iconActiveSelected: true,
        iconOperatorOptions: {
          allowCopy: true,
          allowEdit: false,
          allowDelete: this.repo.isMember,
          allowDownload: true,
          allowCollect: true,
          popDelete: true
        }
      }
    }
  },
  methods: {
    /**
         * 获取图标库基本信息
         *
         * @return   {void}
         */
    getRepoInfo () {
      this.cache.getRepoInfo({
        data: {
          repoId: this.listOpt.repoId
        },
        onload: (result) => {
          this.repo = result.result
          // update automatically
          if (this.repo.unSync) {
            this.syncRepo()
          } else {
            this.updateFontStyle(result.result.cssUrl)
          }
        }
      })
    },
    /**
         * 从图标库中删除图标的引用
         *
         * @param    {Number}           iconId                      图标Id
         * @return   {void}
         */
    deleteIcon (iconId) {
      this.cache.deleteIconFromRepo({
        data: {
          iconId: iconId,
          repoId: this.listOpt.repoId
        },
        onload: function (result) {
          if (result.result) {
            this.$Message.success(result.message || '删除成功,请保存更新！')
            this.$refs.repoIconList.getList()
            this.getRepoInfo()
          } else {
            this.$Message.error(result.message)
          }
        }.bind(this)
      })
    },

    /**
         * 全选|取消全选图标
         *
         */
    selectAllIcon () {
      this.$refs.addIconListRef.selectedAllIcon(this.selectedAllIconFlag)
    },
    /**
         * 添加字体图标Id到图标库对象中
         *
         */
    addIconToRepo () {
      let icons = this.$refs.addIconListRef.selectedIcons
      icons = icons.map((icon) => {
        return {
          iconId: icon.iconId,
          iconName: icon.iconName
        }
      })
      this.cache.addIconToRepo({
        data: {
          icons: icons,
          userId: this.userInfo.userId,
          repoId: this.listOpt.repoId
        },
        onload: function (result) {
          this.$Message.success(result.message || '添加成功,请保存更新！')
          this.$refs.repoIconList.getList()
          this.getRepoInfo()
        }.bind(this)
      })
    },
    /**
         * 更新仓库，同步数据库与git仓库
         *
         */
    syncRepo () {
      this.isSyncRepo = true
      this.cache.syncRepo({
        data: {
          repoId: this.listOpt.repoId
        },
        onload: function (result) {
          this.$Message.success(result.message || '保存更新成功！')
          this.isSyncRepo = false
          this.repo.unSync = false
          this.repo.cssUrl = result.result.url
          this.updateFontStyle(result.result.url)
        }.bind(this)
      })
    },
    /**
         * 添加仓库管理员
         *
         */
    addMember () {
      if (!this.member.account) {
        this.$Message.error('请输入用户Id或邮箱！')
      }
      this.cache.addMember({
        data: {
          repoId: this.listOpt.repoId,
          accountType: this.member.accountType,
          account: this.member.account
        },
        onload: function (result) {
          if (!result.result) {
            this.$Message.error(result.message)
          } else {
            this.$Message.success(result.message || '添加成功！')
            this.member.account = ''
          }
        }.bind(this)
      })
    },
    search (q) {
      this.listOpt.q = q
      this.listOpt.pageIndex = 1
      this.$refs.repoIconList.getList()
    },
    uniqueSearch (q) {
      this.listOptUnique.q = q
      this.listOpt.pageIndex = 1
      this.$refs.addIconListRef.getList()
    },
    insertFontStyle (cssUrl) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.id = 'currentRepoFontStyle'
      link.href = cssUrl
      document.getElementsByTagName('head').item(0).appendChild(link)
    },
    updateFontStyle (cssUrl) {
      if (cssUrl) {
        const link = document.getElementById('currentRepoFontStyle')
        if (link) {
          link.href = cssUrl
        } else {
          this.insertFontStyle(cssUrl)
        }
      }
    }
  },
  created () {
    this.cache = new RepoCache({})
    this.getRepoInfo()
  }
}
</script>

<style lang="scss">
.user-repo-detail {
    width: 1140px;
    margin: 0 auto;

    .repo-icon-search {
        margin-right: 20px;
    }

    .common-search-input {

        .ivu-input {
            border: 1px solid #dddee1;
        }
    }

    .repo-detail {
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #333;
        text-align: left;

        .info-item {
            margin-right: 15px;
        }

        .label {
            color: #999;
            font-size: 19px;
            vertical-align: middle;
        }

        .repo-operator {
        }

        .repo-sync, .add-icon, .add-member {
            margin-right: 20px;
            background: none;
            color: #333;
            border: 1px solid #ddd;
            padding: 6px 15px;
            font-size: 12px;
            border-radius: 4px;
            cursor: pointer;
        }

        .repo-sync {
            background: #336;
            color: #fff;
            border: 1px solid #336;
        }

        .add-icon {
            cursor: pointer;
            padding: 7px 15px;
        }

        .add-member-box {
            margin-right: 20px;
            width: 330px;
        }

        .member-select {
            width: 80px;
        }
    }

    .repo-css {
        margin-top: 10px;
        width: 520px;
    }

    .user-icon-list {
        margin: 30px 0 60px;
    }
}

.ivu-modal-body {
    min-height: 300px;
    padding: 16px 26px;
    max-height: 600px;
    overflow-y: auto;
}

.unique-icon-list {

    .add-operator {
        height: 32px;
        line-height: 32px;
    }

    .common-search-input {

        .ivu-input {
            border: 1px solid #dddee1;
        }
    }

    .common-icon-list-box {
        margin-top: 0;

        .common-icon-card:nth-child(5n) {
            margin-right: 0;
        }
    }
}
</style>
