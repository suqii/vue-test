<template>
  <div id="uploadimg">
    <el-upload
      action="''"
      list-type="picture-card"
      :http-request="uploadpic"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="showlist"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="picList"
    />

    <el-cascader
      v-model="value"
      :options="options"
      :props="{ expandTrigger: 'hover' }"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>
<script>
const OSS = require('ali-oss')
var client = new OSS({
  //以下请输入自己的配置
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI5tB5S5bak4Q325o4EgcR',
  accessKeySecret: 'o0CvstEPN7a1hOSugTlaNhAfjnKdvH',
  bucket: 'suqiqi',
})
//element-ui  upload修改预览功能，需安装element-ui
//说明：
//  uploadpic：父组件传入upload方法
//  list：父组件传入图片列表
//  limit：父组件传入图片大小限制
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'uploadimg',
  components: { ElImageViewer },
  props: ['list', 'uploadpic', 'limit'],
  data() {
    return {
      value: ['MK'],
      options: [
        {
          value: 'test',
          label: '测试',
          children: [
            {
              value: 'testChild',
              label: '测试上传区',
              children: [
                {
                  value: 'testChild1',
                  label: '上传子区1',
                },
                {
                  value: 'testChild2',
                  label: '上传子区2',
                },
                {
                  value: null,
                  label: '当前目录',
                },
              ],
            },
            {
              value: 'headImg',
              label: '头像',
            },
          ],
        },
        {
          value: 'MK',
          label: 'Markdown图片',
        },
      ],
      showViewer: false,
      showlist: [],
      imgList: [],
      picList: [],
    }
  },
  created() {
    this.fileList('MK')
  },
  mounted() {},

  methods: {
    // 选中
    handleChange(value) {
      // console.log(value)
      let _this = this
      _this.path = ''
      value.forEach(function(e) {
        _this.path += e + '/'
      })
      console.log(_this.path)
      this.fileList(value)
    },
    // 文件列表
    async fileList(prefix, marker) {
      try {
        // 不带任何参数，默认最多返回1000个文件
        let result = await client.list()

        result = await client.list({
          prefix: prefix,
          marker: '',
        })
        this.imgList = result.objects
        console.log(this.imgList)

        this.getimgdata()
      } catch (e) {
        console.log(e)
      }
    },
    //获取图片列表
    getimgdata() {
      this.showlist = this.imgList
      for (let i in this.showlist) {
        this.picList.push(this.showlist[i].url)
      }
    },
    //点击预览图片
    handlePictureCardPreview(file) {
      this.showViewer = true
      let i = 0
      for (i = 0; i < this.showlist.length; i++) {
        if (this.picList[i] == file.url) break
      }
      for (let j = 0; j < i; j++) {
        this.picList.push(this.picList[j])
      }
      this.picList.splice(0, i)
    },
    //删除上传图片
    handleRemove(file, fileList) {
      console.log(file.name)
      // console.log(fileList)
      // this.list = fileList
      // this.$emit('update:list', fileList)
      // this.showlist = fileList
      // this.picList = []
      // for (let i in this.showlist) {
      //   this.picList.push(this.showlist[i].url)
      // }
      let result = client.delete(file.name)
      // console.log(result)
    },
    //关闭预览图片
    closeViewer() {
      this.showViewer = false
    },
    beforeAvatarUpload(file) {
      let isLt = file.size / 1024 / 1024 < this.limit
      if (!isLt) {
        this.$message.error('上传头像图片大小不能超过' + this.limit + 'MB!')
      }
      return isLt
    },
  },
  watch: {
    //监听父组件图片列表的变化
    list(val) {
      for (let i in val) {
        this.picList.push(val[i].url)
      }
    },
  },
}
</script>
<style scoped></style>
