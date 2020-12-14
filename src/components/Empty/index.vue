<!--
 * @Author: your name
 * @Date: 2020-12-11 23:32:41
 * @LastEditTime: 2020-12-12 01:06:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/components/SearchInput/index.vue
-->
<template>
<div class="common-empty">
    <div class="common-empty-in">
        <span class="icon-empty"></span>
        <p class="text">{{ text || '什么都没有！！！' }}</p>
    </div>
</div>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="scss">
.common-empty{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    margin: 0 auto;
    width: 100%;

    &-in {
        font-size: 16px;
        text-align: center;
    }

    .text {
        margin-top: 8px;
    }
}
</style>
