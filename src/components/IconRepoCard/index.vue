<!--
 * @Author: your name
 * @Date: 2020-12-11 23:32:41
 * @LastEditTime: 2020-12-11 23:57:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/components/SearchInput/index.vue
-->
<template>
<div class="common-icon-repo-card">
    <router-link class="repo-card-in" :to="{name: 'userRepoDetailModule', params: { repoId: iconRepo.repoId, userId: iconRepo.ownerId }}">
        <div class="repo">
            <ul class="repo-list f-cb" v-if="coverIcons.length > 0">
                <li v-for="(item, index) in coverIcons" class="common-icon-item f-fl" :key="index" v-html="item.iconContent"></li>
            </ul>
            <div class="repo-list list-empty" v-else>
                <div class="list-empty-in">
                    <span class="icon-empty"></span>
                    <p>暂无图标！</p>
                </div>
            </div>
            <div class="repo-info">
                <div class="repo-info-top">
                    <span class="name">
                        <span class="icon-group"></span>
                        <span class="name-text">{{ iconRepo.repoName }}</span>
                    </span>
                    <span class="count">{{ iconRepo.iconCount || iconRepo.icons.length }} icons</span>
                </div>

                <div class="repo-info-bottom">
                <span class="time">
                    <span class="icon-clock"></span>
                    <span class="name-text">{{ iconRepo.createTime | toDate}}</span>
                </span>
                <span v-if="false" class="count">
                    <span class="delete">
                        <span class="icon-empty-fill"></span>
                        删除
                    </span>
                    <span class="edit">
                        <span class="icon-brush"></span>
                        编辑
                    </span>
                </span>
                <span v-else class="repo-prefix">
                    <span class="icon-flag"></span>
                    <span class="">{{ iconRepo.iconPrefix}}</span>
                </span>
                </div>
            </div>
        </div>
    </router-link>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      coverIcons: []
    }
  },
  props: {
    iconRepo: Object
  },
  computed: {
    userInfo () {
      return this.$store.state.webUser
    },
    isOwner () {
      return this.iconRepo.ownerId === this.userInfo.userId
    }
  },
  methods: {

  },
  created () {
    this.coverIcons = this.iconRepo.icons.slice(0, 15)
  }
}
</script>

<style lang="scss">
.common-icon-repo-card{
    width: 274px;
    padding: 11px;
    background: #fff;
    border-radius: 5px;
    margin-right: 20px;
    margin-bottom: 20px;
    text-align: center;
    display: inline-block;
    transition: all .4s;
    position: relative;
    overflow: hidden;
    border: 1px solid #ccc;

    &:hover {
        box-shadow: 2px 2px 8px rgba(22,22,22, .2), -2px -2px 12px rgba(22,22,22, .2);
    }

    .repo-card-in {
        color: inherit;
    }

    .repo {

        &-list {
            height: 170px;
            cursor: pointer;
            overflow: hidden;
            position: relative;
            color: #666;
            display: block;
        }

       .list-empty {
           display: flex;
           align-items: center;
           justify-content: center;
       }

        .list-empty-in {
            font-size: 16px;
            text-align: center;
        }

        .common-icon-item {
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #666;
            float: left;
            margin-top: 4px;
            font-size: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &-info {

            &-top {
                height: 30px;
                line-height: 30px;
                text-align: left;
                display: flex;
                justify-content: space-between;
            }

            &-bottom {
                height: 30px;
                line-height: 30px;
                text-align: left;
                display: flex;
                justify-content: space-between;
            }

            [class^="icon-"] {
                font-size: 16px;
                vertical-align: middle;
            }

            .delete, .edit {
                cursor: pointer;
            }

            .delete {
                margin-right: 4px;
            }
        }
    }
}
</style>
