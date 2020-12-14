<!--
 * @Author: your name
 * @Date: 2020-12-12 00:44:13
 * @LastEditTime: 2020-12-12 00:45:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icon-client/src/components/IconAdd/index.vue
-->
<template>
<div class="common-icon-add">
    <div class="upload-box">
        <i-upload
            multiple
            :with-credentials="true"
            :show-upload-list="false"
            :format="['svg']"
            :max-size="100"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            :on-error="uploadFail"
            :on-format-error="uploadFormatError"
            type="drag"
            accept="image/*"
            :action="uploadIconPath">
            <div class="upload-zone">
                <p class="upload-icon">
                    <span class="icon-upload-clound"></span>
                </p>
                <p class="upload-tip">将SVG文件拖拽至此，或点此上传</p>
            </div>
        </i-upload>
    </div>
</div>

</template>

<script>
import iconUrlConfig from '@/cache/icon/config'
import {
  Upload as IUpload
} from 'iview'
export default {
  data () {
    return {
      title: 'Welcome to Icon App',
      uploadIconPath: iconUrlConfig['icon-draft-add'].url,
      totalCount: 0
    }
  },
  components: { IUpload },
  methods: {
    /**
         * 上传成功
         *
         * @param    {Object}           response                    相应对象
         * @param    {Object}           file                        文件对象
         * @param    {Array}            fileList                    已上传文件对象数组
         * @return   {void}
         */
    uploadSuccess (response, file, fileList) {
      if (response && response.code !== 200) {
        this.$Message.error(response.message)
        return
      }
      this.$emit('onaddicon')
    },
    /**
         * 文件已读取但未上传之前
         *
         * @param    {Object}           file                        文件对象
         * @return   {void}
         */
    beforeUpload (file = {}) {
      // 只读属性，不可修改
      // file.name = file.name.replace('.svg', '');
    },
    /**
         * icon上传失败
         *
         */
    uploadFail (error, file, fileList) {
      this.$Message.error(error)
      console.log(error)
    },
    /**
         * 上传文件格式错误
         *
         */
    uploadFormatError (file, fileList) {
      this.$Message.error('请上传svg文件！')
    }
  }
}
</script>

<style lang="scss">
.common-icon-add{

    .ivu-upload-drag:hover {
        border-color: #336;
    }

    .upload-box {
        margin-top: 30px;
    }

    .upload-zone {
        padding: 50px 0;

    }

    .upload-icon {
        font-size: 32px;
    }

    .upload-tip {
        font-size: 14px;
        line-height: 24px;
        color: #999;
    }
}
</style>
