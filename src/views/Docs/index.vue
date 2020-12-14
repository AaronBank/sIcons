<template>
<div class="docs">
    <div class="docs-side-menu">
        <i-menu class="f-fl" :active-name="currentRouterPathName"  @on-select="changeTab($event)"  width="200px">
            <i-menu-item :key="item.name" v-for="item in menus" :name="item.name">
                <Icon :type="item.icon"></Icon>
                {{ item.label }}
            </i-menu-item>
        </i-menu>
    </div>
    <div class="docs-content">
        <router-view :key="currentRouterPath"></router-view>
    </div>
</div>
</template>

<script>
import {
  Menu as IMenu,
  MenuItem as IMenuItem,
  Icon
} from 'iview'
export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      menus: [
        {
          label: '功能介绍',
          name: 'docsIntroduce',
          content: '功能介绍',
          icon: 'ios-paper'
        },
        {
          label: '图标绘制',
          name: 'docsIconMaker',
          content: '图标绘制',
          icon: 'hammer'
        },
        {
          label: '常见问题',
          name: 'docsTrouble',
          content: '常见问题',
          icon: 'settings'
        }
      ]
    }
  },
  components: { IMenu, IMenuItem, Icon },
  computed: {
    currentRouterPathName () {
      return this.$route.name || this.tabs[0].name
    },
    currentRouterPath () {
      return this.$route.fullPath
    }
  },
  methods: {
    changeTab (name) {
      this.$router.push({ name: name })
    }
  }
}
</script>

<style lang="scss">
body {
    background: #f8f8f8;
}

.docs {
    width: 1200px;
    display: flex;
    margin: 30px auto 0;

    &-side-menu {
        background: #fff;

        .ivu-menu-light:after {
            display: none;
        }

        .ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
            border-left: 2px solid transparent;
            border-right: none;
        }

        .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
            border-right: none;
            border-left: 2px solid #336;
            color: #336;
        }

        .ivu-menu-item {
            border: none;
            font-size: 18px;
        }
    }

    &-content {
        flex: 1;
        background: #fff;
        margin-left: 20px;
        padding: 20px 40px 60px;
    }
}
</style>
