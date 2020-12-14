<!--
 * @Author: your name
 * @Date: 2020-12-12 00:21:35
 * @LastEditTime: 2020-12-12 00:23:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/components/TopBar/index.vue
-->
<template>
<div class="login-dialog">
    <modal v-model="showModal" :footer-hide="footerHide">
        <div class="login-dialog">
            <div slot="header">
                <div class="login-dialog-header">
                    <h3 class="title">{{ loginDialogType=='login' ? '登录' : '注册' }}</h3>
                </div>
            </div>
            <div class="login-dialog-form">
                <login-form v-if="loginDialogType=='login'"></login-form>
                <register-form v-else></register-form>
            </div>
            <div slot="footer">
                <div class="login-dialog-footer">
                    <span v-if="loginDialogType=='login'" @click="changeLoginType('register')" class="go-register">去注册</span>
                    <span v-else @click="changeLoginType('login')" class="go-login">去登录</span>
                </div>
            </div>
        </div>
    </modal>
</div>
</template>

<script>
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm/'
import { Modal } from 'iview'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      footerHide: true
    }
  },
  components: { LoginForm, Modal, RegisterForm },
  computed: {
    ...mapState([
      'showLoginModal',
      'loginDialogType'
    ]),
    showModal: {
      get: function () {
        return this.showLoginModal
      },
      set: function (v) {
        this.$store.commit('showLoginModal', v)
      }
    }
  },
  methods: {
    changeLoginType (type) {
      this.$store.commit('loginDialogType', type)
    }
  }
}
</script>

<style lang="scss">
.login-dialog{
    padding: 30px 30px 20px;

    .title {
        font-size: 22px;
        text-align: center;
    }

    &-footer {
        margin-top: 10px;

        .go-login {
            cursor: pointer;
        }

        .go-register {
            cursor: pointer;
        }
    }

    .validation-error {
        top: 46px;
    }
}

</style>
