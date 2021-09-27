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
// import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'uploadimg',
  components: {},
  props: ['list', 'uploadpic', 'limit'],
  data() {
    return {
      showViewer: false,
      showlist: [],
      imgList: [],
      picList: [],
    }
  },
  created() {},
  mounted() {
    this.fileList()
  },

  methods: {
    // 文件列表
    async fileList(prefix, marker) {
      try {
        // 不带任何参数，默认最多返回1000个文件
        let result = await client.list()
        // 根据nextMarker继续列出文件
        // if (result.isTruncated) {
        //   result = await client.list({ marker: result.nextMarker })
        // }
        // 列出前缀为'test'且在'headImg'之后的文件
        result = await client.list({
          prefix: 'MK',
          marker: '',
        })
        this.imgList = result.objects
        // console.log(result.objects[1].url)
        // console.log(this.imgList)
        console.log(result)
        this.getimgdata()
      } catch (e) {
        console.log(e)
      }
    },
    //获取图片列表
    getimgdata() {
      this.showlist = this.list
      for(let i in this.showlist) {
          this.picList.push(this.showlist[i].url)
      }
      // console.log('获取图片')
      console.log(this.imgList)
      this.imgList.forEach((item) => {
        console.log(item.url)
        // this.picList.push(item.url)
      })
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
      // this.list = fileList
      this.$emit('update:list', fileList)
      this.showlist = fileList
      this.picList = []
      for (let i in this.showlist) {
        this.picList.push(this.showlist[i].url)
      }
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
      this.showlist = val
      this.picList = []
      for (let i in this.showlist) {
        this.picList.push(this.showlist[i].url)
      }
    },
  },
}
</script>
<style scoped></style>
