<template>
<div class="common-icon-list" >
    <div class="common-icon-list-box f-cb" v-if="list.length > 0">
        <icon-card
            v-for="item in list"
            :icon="item" :key="item.iconId"
            @delete="deleteIcon($event)"
            @collect="collectIcon($event)"
            @selected="selectedIcon($event)"
            @unselected="unselectedIcon($event)"
            @edit="updateIcon($event)"
            @download="downloadIcon($event)"
            :icon-operator-options="iconOperatorOptions"
            :icon-active-selected="iconActiveSelected"
            :copy-text-prefix="copyTextPrefix"
            :selected-all-icon-flag="selectedAllIconFlag"
        ></icon-card>
    </div>
    <common-empty :text="emptyText || '暂无图标!'" v-else></common-empty>
    <div class="common-icon-list-page"  v-if="totalPageCount > 1">
        <i-page :total="totalCount" :page-size="listOpt.pageSize" @on-change="turnPage($event)"></i-page>
    </div>
</div>
</template>

<script>
import listView from '@/mixins/listView'
import IconCache from '@/cache/icon/cache'
import IconCard from '../IconCard'
import CommonEmpty from '../Empty'
import {
  Page as IPage
} from 'iview'
export default {
  mixins: [listView],
  data () {
    return {
      list: [],
      selectedIcons: [],
      selectedAllIconFlag: false
    }
  },
  components: { IconCard, IPage, CommonEmpty },
  props: ['listOpt', 'extOpt', 'iconOperatorOptions', 'iconActiveSelected', 'emptyText', 'copyTextPrefix'],
  computed: {
    userInfo () {
      return this.$store.state.webUser
    }
  },
  methods: {
    _getCacheInstance () {
      return new IconCache()
    },
    turnPage (page) {
      this.go(page || 1)
    },
    afterUpdate (result) {
      this.$Message.success({
        content: result.message
      })
    },
    /**
         * 删除图标
         *
         * @param    {Integer}        iconId            字体图标Id
         * @return   {void}
         */
    deleteIcon (iconId) {
      this.$emit('delete-icon', iconId)
      // 把删除操作冒泡给外层, 由外层处理
      if ((this.iconOperatorOptions || {}).popDelete) {
        return
      }
      this.delete({
        data: {
          iconId: iconId
        }
      })
    },

    /**
         * delete success callback
         *
         * @return   {void}
         */
    afterDelete (result) {
      this.$Message.success({
        content: result.message
      })
    },
    /**
         * 更新图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
    updateIcon (icon = {}) {
      this.update({
        data: {
          iconId: icon.iconId,
          iconName: icon.iconName
        }
      })
    },
    /**
         * collect icon
         *
         * @param    {Object}        icon            icon object
         * @return   {void}
         */
    collectIcon (icon = {}) {
      this.cache.collectIcon({
        data: icon,
        onload: (result) => {
          if (result.result) {
            this.$Message.success('图标已收藏到 上传图标 中')
          } else {
            this.$Message.error(result.result.message || '收藏失败！')
          }
        }
      })
    },
    /**
         * 选中图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
    selectedIcon (icon) {
      if (!this.iconActiveSelected) {
        return
      }
      this.selectedIcons.push(icon)
      this.$emit('selected', icon)
    },
    /**
         * 取消选中图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
    unselectedIcon (icon) {
      const index = this.selectedIcons.indexOf(icon)
      if (index !== -1) {
        this.selectedIcons.splice(index, 1)
      }
      this.$emit('unselected', icon)
    },
    /**
         * 全选|取消全选图标
         *
         * @param    {Boolean}        selected            全选|取消全选
         * @return   {void}
         */
    selectedAllIcon (selected) {
      this.selectedAllIconFlag = selected
    },
    /**
         * 下载图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
    downloadIcon (icon) {
      this.$emit('download', icon)
      this.download({
        data: {},
        params: {
          iconId: icon.iconId
        }
      })
    }
  }
}
</script>

<style lang="scss">
.common-icon-list{
    &-title {
        font-size: 24px;
        color: #336;
        line-height: 24px;
        height: 24px;
        font-weight: normal;
    }

    &-count {
        font-size: 14px;
        color: #ccc;
    }

    &-box {
        margin-top: 30px;
    }

    &-page {
        text-align: center;
        margin-top: 30px;
    }

    .item-add {
        color: #333;
        font-size: 14px;

        &:hover{
            cursor: pointer;
        }
    }
}
</style>
