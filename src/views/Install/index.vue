<template>
<div class="install">
    <h3 class="sub-name">启动数据配置</h3>
    <p class="description">以下基本数据配置完成之后，理论山nicon服务就可以正常启动，连接上数据库提供服务了。但是如果需要自定义上传与登录服务时，需要添加额外的参数，添加的所有参数最终会在nicon工程目录中生成 <b>/bin/start.sh</b>文件，当应用启动时，以下所有参数都会加入到环境变量 <b>process.env</b>中,如需可取，如果需要配置错误需重新配置，只需要停掉服务、删掉工程中的<b>/bin/start.sh</b>文件, 再重新启动访问后就可以跳转到该页面再进行重新安装</p>
    <div class="install-table">
        <i-row v-for="(item, index) in config" :key="index">
            <i-col span="2">字段: </i-col>
            <i-col span="6">
                <i-input :disabled="item.necessary" v-model="item.name"></i-input>
            </i-col>
            <i-col span="2">值: </i-col>
            <i-col span="6">
                <i-input v-model="item.value"></i-input>
            </i-col>
            <i-col span="2">备注: </i-col>
            <i-col span="5">
                <i-input v-model="item.description"></i-input>
            </i-col>
            <i-col span="1" v-if="!item.necessary">
                <span @click="deleteItem(index)" class="delete icon-delete"></span>
            </i-col>
        </i-row>
        <a class="add-item" title="添加字段" @click="addItem">
            <span class="icon-addition"></span>
        </a>
    </div>
    <p class="product-type description">
        当需要非三方的登录、上传服务时，需要配置 <b>productType</b>的值，<b>productType</b>值的规则为 login[_upload]。 比如需要github三方登录，七牛的上传存储服务时，productType的值为 <b>github_qiniu</b>，即登录、上传服务的两两组合， 而当登录、上传类型的名称相同时，只需要login的名称就行，比如登录、上传服务都为netease,那么 <b>productType</b>为 <b>netease</b>即可。目前该工程中提供登录服务有两种 <b>default</b>、<b>github</b>，上传服务有两种 <b>default</b>、<b>github</b>，那么按照 <b>login_upload</b>的组合就有4中方式，如果 <b>productType</b>的值为以上四种组合，那么无需配置以下的登录、上传服务的代码，否者则需要配置</p>
    <h3 class="sub-name">登录服务代码配置</h3>
    <p class="description">需要接入自定义登录服务时，需要自己实现登录逻辑，并且登录的逻辑代码需要自己实现。代码中需要导出指定方法并且该方法需返回指定参数即可。当 <b>productType</b>不为 <b>default</b>或 <b>github_qiniu</b>等已经存在的服务时，才需要配置该文件</p>
    <div class="install-table">
        <div class="login-service">
            <i-tabs value="index">
                <i-tab-pane label="逻辑代码" name="index">
                    <i-input :rows="16" v-model="login.index" :placeholder="loginPlaceholder" type="textarea"></i-input>
                </i-tab-pane>
                <i-tab-pane label="配置代码" name="config">
                    <i-input :rows="16" v-model="login.config" :placeholder="configPlaceholder" type="textarea"></i-input>
                </i-tab-pane>
            </i-tabs>
        </div>
    </div>
    <h3 class="sub-name">上传服务代码配置</h3>
    <p class="description">需要接入自定义上传服务时，需要自己实现上传逻辑，并且上传的逻辑代码需要自己实现。代码中需要导出指定方法并且该方法需返回指定参数即可。当 <b>productType</b>不为 <b>default</b>或 <b>github_qiniu</b>等已经存在的服务时，才需要配置该文件</p>
    <div class="install-table">
        <div class="upload-service">
            <i-tabs value="index">
                <i-tab-pane label="逻辑代码" name="index">
                    <i-input :rows="16" v-model="upload.index" :placeholder="uploadPlaceholder" type="textarea"></i-input>
                </i-tab-pane>
                <i-tab-pane label="配置代码" name="config">
                    <i-input :rows="16" v-model="upload.config" :placeholder="configPlaceholder" type="textarea"></i-input>
                </i-tab-pane>
            </i-tabs>
        </div>
    </div>
    <i-button type="success" class="install-submit" @click="submit()">提交</i-button>
</div>
</template>
<script>
import CommonCache from '@/cache/common/cache'
import {
  Input as IInput,
  Button as IButton,
  Row as IRow,
  Col as ICol,
  Tabs as ITabs,
  TabPane as ITabPane
} from 'iview'
export default {
  data () {
    return {
      config: [
        {
          name: 'MONGODB_NAME',
          value: 'iconRepo',
          description: 'mongo数据库名称',
          necessary: true
        },
        {
          name: 'MONGODB_HOST',
          value: '127.0.0.1',
          description: 'mongo数据库IP',
          necessary: true
        },
        {
          name: 'MONGODB_PORT',
          value: '27017',
          description: 'mongo数据库端口',
          necessary: true
        },
        {
          name: 'MONGODB_USERNAME',
          value: '',
          description: 'mongo数据库用户名',
          necessary: true
        },
        {
          name: 'MONGODB_PASSWORD',
          value: '',
          description: 'mongo数据库密码',
          necessary: true
        },
        {
          name: 'REDIS_HOST',
          value: '127.0.0.1',
          description: 'redis数据库IP',
          necessary: true
        },
        {
          name: 'REDIS_PORT',
          value: '6379',
          description: 'redis数据库端口',
          necessary: true
        },
        {
          name: 'REDIS_PASSWORD',
          value: '',
          description: 'redis数据库密码',
          necessary: true
        },
        {
          name: 'productHost',
          value: 'icon.bolin.site',
          description: '访问网站host',
          necessary: true
        },
        {
          name: 'productType',
          value: 'default',
          description: '产品类型，自定义上传服务与登录服务文件夹名称，不使用则默认',
          necessary: true
        }
      ],
      login: {
        index: '',
        config: ''
      },
      upload: {
        index: '',
        config: ''
      },
      uploadPlaceholder: `
                // index.js
    
                let config = require('./config');
                let qiniu = require('qiniu');
                
                class QiniuUpload {
                    async upload (dirPath) {
                        let fontMap = await this.uploadFonts(dirPath);
                        // 上传font完毕后替换css中的引用
                        let cssContent = await this.replaceFontsInCss(dirPath, fontMap);
                        let cssUrl = await this.uploadCss(dirPath, cssContent);
                        
                        // 上传返回数据格式
                        return {
                            url: cssUrl, // 必须
                            cssContent: cssContent // 必须
                        };
                    }
                }
                
                let uploadIns = new QiniuUpload();
                module.exports = uploadIns.upload.bind(uploadIns);
                `,
      loginPlaceholder: `
                // index.js
    
                require('request');
                let rp = require('request-promise');
                let config = require('./config');
                
                class GithubOpenIdLogin {
                    async login (ctx) {
                        return this.getUserBaseInfo(ctx);
                    }
                
                    async getUserBaseInfo (ctx) {
                        // your code
                        
                        // login 方法返回的数据格式
                        return {
                            userName: tokenInfo.sub, // 必须且唯一
                            password: tokenInfo.sub,
                            email: openIdUserInfo.email,
                            nickName: openIdUserInfo.nickname,
                            fullName: openIdUserInfo.fullname
                        }
                    }
                }
                
                let loginIns = new GithubOpenIdLogin();
                module.exports = loginIns.login.bind(loginIns);
                `,
      configPlaceholder: `
                let pe = process.env;
                
                module.exports = {
                    accessKey: pe.QINIU_UPLOAD_ACCESS_KEY,
                    secretKey: pe.QINIU_UPLOAD_SECRET_KEY,
                    bucket: pe.QINIU_UPLOAD_BUCKET,
                    cdnHost: pe.QINIU_UPLOAD_CDN_HOST
                };`
    }
  },
  components: { IInput, IButton, IRow, ICol, ITabs, ITabPane },
  methods: {
    addItem () {
      this.config.push({
        name: '',
        value: '',
        description: ''
      })
    },
    deleteItem (index) {
      this.config.splice(index, 1)
    },
    submit () {
      const data = {
        config: this.config.filter(item => {
          return item.value !== ''
        }),
        login: this.login,
        upload: this.upload
      }
      this.cache.installApplication({
        data: data,
        onload: result => {
          if (result.result) {
            let seconds = 5
            const timer = setInterval(() => {
              if (seconds > 0) {
                seconds--
              } else {
                clearInterval(timer)
                location.href = location.protocol + '//' + location.host
              }
            }, 1000)
            this.$Modal.success({
              title: '提示',
              content: `应用将在${seconds}秒之后自动重启`
            })
          }
        }
      })
    }
  },
  created: function () {
    this.cache = new CommonCache({})
  }
}
</script>

<style lang="scss">
.install{
    margin: 0 auto 120px;
    width: 960px;
    text-align: center;

    .sub-name {
        font-size: 20px;
        text-align: center;
        margin-top: 60px;
    }

    .delete {
        cursor: pointer;
        font-size: 32px;
    }

    .description {
        font-size: 12px;
        color: #999;
        width: 720px;
        margin: 12px auto;
        text-align: justify;
    }

    .product-type {
        padding-top: 40px;
        text-align: left;
    }

    .validation-box {
        margin-top: 30px;
    }

    .add-item {
        position: absolute;
        height: 32px;
        width: 32px;
        text-align: center;
        line-height: 32px;
        font-size: 32px;
        color: rgb(40, 43, 51);
        bottom: 0;
        right: -30px;
    }

    .invalid {
        .ivu-input {
            border-color: #f20;
        }

        .ivu-input:hover {
            box-shadow: 0 0 0 2px rgba(255, 34, 0, 0.1);
        }
    }

    .validation-error{
        position: absolute;
        line-height: 28px;
    }

    &-title{
        font-size: 24px;
    }

    &-table{
        position: relative;
        margin-top: 30px;

        .ivu-row{
            margin-top: 12px;
        }

        .ivu-col-span-2, .ivu-col-span-1 {
            text-align: right;
            height: 32px;
            line-height: 32px;
            font-size: 12px;
        }

        .ivu-col-span-1 {
            text-align: center;
            line-height: 46px;
        }

        .ivu-col-span-6, .ivu-col-span-5 {
            line-height: 32px;
            text-align: left;
            padding-left: 10px;
            position: relative;

        }

        .ivu-input-large{
            height: 32px;
        }
    }

    &-submit{
        margin-top: 40px;
        width: 160px;
        background: rgb(40, 43, 51);
        color: #fff;
        height: 44px;
        font-size: 16px;
        border: 1px solid rgb(40, 43, 51);

        &:hover{
            border: 1px solid #494993;
            background: #494993;
            color: #fff;
        }
    }
}
</style>
