<!--
 * @Author: your name
 * @Date: 2020-12-12 00:21:35
 * @LastEditTime: 2020-12-12 00:25:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/components/TopBar/index.vue
-->
<template>
<div class="login-form" ref="checkContainer">
    <i-row>
        <i-col span="24">
            <i-input size="large" ref="userName" v-model="userName" v-check="rules.userName" placeholder="请输入手机号码"></i-input>
        </i-col>
    </i-row>
    <i-row>
        <i-col span="24">
            <i-input size="large" type="password" ref="password" v-model="password"  v-check="rules.password" placeholder="请输入密码"></i-input>
        </i-col>
    </i-row>
    <i-row>
        <i-col span="24">
            <i-button type="success" class="login-form-submit" @click="submit()">登录</i-button>
        </i-col>
    </i-row>
</div>
</template>

<script>
import validatorRules from './validateRules'
import LoginCache from '@/cache/user/cache'
import md5 from 'blueimp-md5'
import {
  Input as IInput,
  Button as IButton,
  Row as IRow,
  Col as ICol
} from 'iview'
export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      userName: '',
      password: '',
      userNameErr: '',
      passwordErr: '',
      rules: validatorRules
    }
  },
  components: { IInput, IButton, IRow, ICol },
  methods: {
    submit () {
      this.$checkAll().then(() => {
        this.cache.userLogin({
          data: {
            userName: this.userName,
            password: md5(this.password)
          },
          onload: this.loginSuccess.bind(this)
        })
      }).catch(errors => {
        console.log(errors)
      })
    },
    loginSuccess (result) {
      // 登录成功
      if (result.result) {
        window.webUser = result.result
        this.$store.commit('showLoginModal', false)
        this.$store.commit('webUser', result.result)
      } else {
        for (const attr in result.message) {
          if (result.message.hasOwnProperty(attr)) {
            this.$feedbackErrors(result.message[attr], {
              compIns: this.$refs[attr]
            })
          }
        }
      }
    }
  },
  created () {
    this.cache = new LoginCache()
  }
}
</script>

<style lang="scss">
.login-form{
    .ivu-row{
        margin-top: 20px;
    }

    .ivu-col-span-4{
        text-align: right;
        height: 42px;
        line-height: 42px;
        font-size:16px;
    }

    .ivu-col-span-20{
        line-height: 42px;
        text-align: left;
        padding-left: 25px;
        position: relative;

    }

    .ivu-input-large{
        height: 42px;
    }

    .ivu-btn {
        width: 100%;
        height:42px;
        font-size: 16px;
        background-color: rgb(40, 43, 51);
        border-color: rgb(40, 43, 51);
    }
}
</style>
