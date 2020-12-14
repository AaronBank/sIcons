<template>
<div class="user-repo">
    <router-view :key="currentRouterPath"></router-view>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Welcome to Icon App'
    }
  },
  components: {},
  computed: {
    userInfo () {
      return this.$store.state.webUser
    },
    currentRouter () {
      return this.$router.currentRoute.name || this.tabs[0].name
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

</style>
