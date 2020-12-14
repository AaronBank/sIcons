<template>
<div class="docs-trouble">
    <h3 class="trouble-title">常见问题</h3>
    <div class="trouble-content">
        呵呵~~暂时没问题
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Welcome to Icon App'
    }
  }
}
</script>

<style lang="scss">
.docs-trouble{
    text-align: left;

    .trouble-title {
        font-size: 24px;
        line-height: 60px;
        height: 60px;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }

    .trouble-content {

        .title {
            font-size: 18px;
            font-weight: bold;
            line-height: 32px;
            margin-top: 20px;
        }

        .description {
            font-size: 14px;
            line-height: 22px;
            margin-top: 5px;
        }

        .img {
            max-width: 100%;
        }
    }
}
</style>
