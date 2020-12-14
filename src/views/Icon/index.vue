<!--
 * @Author: your name
 * @Date: 2020-12-12 00:50:36
 * @LastEditTime: 2020-12-12 00:51:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/views/User/Icon/index.vue
-->
<template>
<div class="user-icon">
    <router-view></router-view>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Welcome to Icon App'
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.webUser
    },
    currentRouter () {
      return this.$router.currentRoute.name || this.tabs[0].name
    }
  }
}
</script>

<style lang="scss">

</style>
