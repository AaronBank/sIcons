<!--
 * @Author: your name
 * @Date: 2020-12-12 00:21:35
 * @LastEditTime: 2020-12-12 00:26:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/components/TopBar/index.vue
-->
<template>
<div class="register-form" ref="checkContainer">
    <i-row>
        <i-col span="24">
            <i-input size="large" v-model="userName" ref="userName" v-check="rules.userName" placeholder="请输入手机号码"></i-input>
        </i-col>
    </i-row>
    <i-row>
        <i-col span="24">
            <i-input size="large" type="password" v-model="password"  ref="password"  v-check="rules.password"  placeholder="请输入密码"></i-input>
        </i-col>
    </i-row>
    <i-row>
        <i-col span="24">
            <i-input type="password" size="large" v-model="rePassword"  ref="rePassword" v-check="rules.rePassword" placeholder="请再次确认密码"></i-input>
        </i-col>
    </i-row>
    <i-row>
        <i-col span="24">
            <i-button type="success" class="register-form-submit" @click="submit()">注册</i-button>
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
      rePassword: '',
      rules: validatorRules
    }
  },
  components: { IInput, IButton, IRow, ICol },
  methods: {
    submit () {
      this.$checkAll().then(() => {
        this.cache.userRegister({
          data: {
            userName: this.userName,
            password: md5(this.password),
            rePassword: md5(this.rePassword)
          },
          onload: this.registerSuccess.bind(this)
        })
      }).catch(result => {
        for (const attr in result.message) {
          if (result.message.hasOwnProperty(attr)) {
            this.$feedbackErrors(result.message[attr], {
              compIns: this.$refs[attr]
            })
          }
        }
      })
    },
    registerSuccess (result) {
      // 注册成功
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
.register-form{
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
