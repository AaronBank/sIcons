<template>
<div class="common-icon-card" @click="selectedIcon()">
    <div class="common-icon-card-in">
        <div class="common-icon-card-svg">
            <span v-if="copyTextPrefix" :class="copyTextPrefix + icon.iconName"></span>
            <span v-else v-html="icon.iconContent"></span>
        </div>
        <span class="common-icon-card-name" title="bulb" v-if="!isEdit">{{ icon.iconName }}</span>
        <i-input @on-blur="editIcon" :autofocus="isEdit" v-model="icon.iconName" size="small" class="edit-name" v-else></i-input>
        <div class="common-icon-card-selected" :class="{selected: selected}" v-if="iconActiveSelected"></div>
        <div class="common-icon-card-cover" v-if="!iconActiveSelected && !isEdit">
            <span v-if="iconOperatorOptions.allowCopy" :data-copy="copyTextPrefix + icon.iconName" title="复制图标名" class="cover-item icon-interactive copy-button"></span>
            <span v-if="iconOperatorOptions.allowEdit" title="编辑图标" class="cover-item icon-editor" @click.stop="changeEditStatus"></span>
            <span v-if="iconOperatorOptions.allowDelete" title="删除图标" class="cover-item icon-trash" @click="deleteIcon"></span>
            <span v-if="iconOperatorOptions.allowDownload" title="下载图标" class="cover-item icon-download" @click="downloadIcon"></span>
            <span v-if="iconOperatorOptions.allowCollect" title="收藏图标" class="cover-item icon-collection" @click="collectIcon"></span>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      selected: false,
      isEdit: false,
      preIconName: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.webUser
    },
    isOwner () {
      return this.icon.ownerId === this.userInfo.userId
    }
  },
  props: {
    icon: Object,
    iconOperatorOptions: {
      type: Object,
      default: function () {
        return {
          allowCopy: true,
          allowEdit: true,
          allowDelete: true,
          allowDownload: true,
          allowCollect: true
        }
      }
    },
    copyTextPrefix: {
      type: String,
      default: ''
    },
    iconActiveSelected: {
      type: Boolean,
      default: false
    },
    selectedAllIconFlag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selectedAllIconFlag: function (newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      this.selectedIcon(newVal)
    }
  },
  methods: {
    /**
         * 删除图标
         *
         * @param    {Integer}        iconId            字体图标Id
         * @return   {void}
         */
    deleteIcon () {
      const that = this
      this.$Modal.confirm({
        content: '是否确定删除图标？',
        onOk () {
          that.$emit('delete', that.icon.iconId)
        }
      })
    },
    /**
         * 拷贝图标名称
         *
         * @param    {String}        iconName            字体图标名称
         * @return   {void}
         */
    copyIconName () {
      this.$emit('copy', this.icon.iconName)
    },
    /**
         * collect icon | add to draft
         *
         * @return   {void}
         */
    collectIcon () {
      this.$emit('collect', this.icon)
    },
    /**
         * icon编辑状态改变
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
    changeEditStatus () {
      this.isEdit = true
      // 保留编辑钱状态
      this.preIconName = this.icon.iconName
      this.$emit('editStatus', this.isEdit)
    },
    /**
         * 编辑图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
    editIcon () {
      this.isEdit = false
      if (this.preIconName === this.icon.iconName) {
        return
      }
      this.$emit('edit', this.icon)
    },
    /**
         * 选中图标
         *
         * @param    {Boolean}        selected            字体图标对象
         * @return   {void}
         */
    selectedIcon (selected) {
      if (!this.iconActiveSelected) {
        return
      }
      this.selected = (selected === undefined) ? !this.selected : selected
      this.$emit(this.selected ? 'selected' : 'unselected', this.icon)
    },
    /**
         * 下载图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
    downloadIcon () {
      this.$emit('download', this.icon)
    }
  },
  created () {}
}
</script>

<style lang="scss">
.common-icon-card{
    float: left;
    width: 100px;
    height: 105px;
    text-align: center;
    position: relative;
    border: 1px dashed #eee;
    border-radius: 5px;
    margin: 18px 14px 0 0;
    overflow: hidden;

    &-svg {
        font-size: 36px;
        max-width: 100%;
        text-align: center;
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &-name {
        display: block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        color: #666;
        font-size: 12px;
        text-align: center;
        margin-top: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .edit-name {
        margin-top: 15px;

        .ivu-input-small {
            text-align: center;
            height: 20px;
            line-height: 20px;
        }
    }

    &-cover {
        width: 100%;
        height: 100%;
        background: rgba(13,10,49,.9);
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        overflow: hidden;
        vertical-align: middle;
        border-radius: 5px;
        font-size: 0;

        .cover-item {
            width: 50%;
            height: 52.5px;
            line-height: 52.5px;
            text-align: center;
            color: #fff;
            font-size: 22px;
            display: inline-block;
            cursor: pointer;

            &:hover {
                background: #0d0a31;
                color: red;
            }
        }
    }

    &:hover {
        .common-icon-card-cover {
            display: block;
        }
    }

    &-selected {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
    }

    .selected {
        border-color: red;
    }
}
</style>
