<!--
 * @Author: your name
 * @Date: 2020-12-11 23:32:41
 * @LastEditTime: 2020-12-11 23:37:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/components/SearchInput/index.vue
-->
<template>
  <div class="common-search-input">
      <i-input v-model="value" :placeholder="placeholder" @on-enter="doSearch">
          <i-button @click="doSearch" slot="append">
              <span class="icon-search"></span>
          </i-button>
      </i-input>
  </div>
</template>

<script>
import {
  Input as IInput,
  Button as IButton
} from 'iview'
export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      isSearching: false,
      value: ''
    }
  },
  props: {
    initValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '搜索全部图标'
    }
  },
  components: { IInput, IButton },
  watch: {
    value: function (val, oldVal) {
      if (val !== oldVal) {
        this.isSearching = true
      }
    }
  },
  methods: {
    doSearch () {
      // forbidden search when init
      if (!this.isSearching) {
        return
      }
      this.isSearching = false
      this.$emit('search', this.value)
    }
  },
  created: function () {
    this.value = this.initValue
  }
}
</script>

<style lang="scss">
.common-search-input {

    .ivu-input-group {
        top: 0;
    }

    .ivu-input-group-append {
        padding: 0 6px;
    }

    .ivu-btn {
        line-height: inherit;
        font-size: 16px;
    }

    .ivu-input {
        border: none;
        box-shadow: none;
    }

    .ivu-input:focus {
        border: none;
    }
}
</style>
