<template>
  <div class="hello">
    <uploadimg :list.sync="list" :uploadpic="uploadpic" :limit="limit" />
  </div>
</template>

<script>
//组件位置根据自己情况修改
import uploadimg from '../components/uploadimg.vue'

const OSS = require('ali-oss')
const accessKeyId = 'LTAI6tB6S6bak4Q326o4EgcR'
const accessKeySecret = 'o0CvstEPN761hOSugTl6NhAfjnKdvH'

var client = new OSS({
  //以下请输入自己的配置
  region: 'oss-cn-beijing',
  accessKeyId: accessKeyId.replace(/6/g, '5'),
  accessKeySecret: accessKeySecret.replace(/6/g, 'a'),
  bucket: 'suqiqi',
})

export default {
  name: 'Alioss',
  components: { uploadimg },
  data() {
    return {
      list: [],
      testList: [],
      uploadPath: 'freeFind/',
      imgList: [],
      limit: 2,
      path: '',
    }
  },
  methods: {
    uploadpic(file) {
      // this.handleChange()
      // console.log("上传目录"+this.uploadPath)
      client
        .put(this.uploadPath + file.file.name, file.file)
        .then((res) => {
          this.list.push({ url: res.url })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    listBuckets() {
      let result = client.listBuckets()
      console.log(result)
    },
    // 选中
    handleChange(value) {
      console.log(value)
      let _this = this
      _this.path = ''
      value.forEach(function(e) {
        _this.path += e + '/'
      })
      this.uploadPath = _this.path
      console.log(_this.path)
    },
  },

  mounted() {
    // this.listBuckets()
    // 获取所有目录
    // this.listDir()
    // this.listDirItem('MK/')
    // this.fileList('test','headImg')
  },
}
</script>

<style scoped></style>
