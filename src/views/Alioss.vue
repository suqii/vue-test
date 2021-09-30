<template>
  <div class="hello">
    <uploadimg :list.sync="list" :uploadpic="uploadpic" :limit="limit" />
    <el-form>
      <el-form-item label="">
        <!-- <el-button type="primary" @click="fileList" size="mini"
          >文件列表</el-button
        >
        <el-button type="primary" @click="listDir" size="mini"
          >listDir</el-button
        > -->
        <!-- 路径选择 -->
            <el-form-item label="当前文件路径">
              <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
      
      </el-form-item>

      
    </el-form>
  </div>
</template>

<script>
//组件位置根据自己情况修改
import uploadimg from '../components/uploadimg.vue'

const OSS = require('ali-oss')
var client = new OSS({
  //以下请输入自己的配置
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI5tB5S5bak4Q325o4EgcR',
  accessKeySecret: 'o0CvstEPN7a1hOSugTlaNhAfjnKdvH',
  bucket: 'suqiqi',
})

export default {
  name: 'Alioss',
  components: { uploadimg },
  data() {
    return {
      list: [],
      testList: [],
      uploadPath:'MK/',
      imgList: [],
      limit: 2,
      path: '',
      value: ['test', 'testChild', 'testChild1'],
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
          value: 'data',
          label: 'data',
          children: [
            {
              value: 'freeFind',
              label: 'freeFind',
            },
          ],
        },
        {
          value: 'MK',
          label: 'Markdown图片',
        },
      ],
    }
  },
  methods: {
    uploadpic(file) {
      this.handleChange()
      console.log("上传目录"+this.uploadPath)
     

      client
        .put(this.uploadPath+file.file.name, file.file)
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
