<template>
  <div id="uploadimg">
    <el-form ref="form">
      <el-form-item label="当前文件">
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
      </el-form-item>
      <el-form-item label="阿里云bucket">
        <el-input v-model="keySet.bucket"></el-input>
      </el-form-item>
      <el-form-item label="阿里云key">
        <el-input v-model="keySet.key"></el-input>
      </el-form-item>
      <el-form-item label="testValue">
        <el-input v-model="testValue"></el-input>
      </el-form-item>
      <el-form-item label="阿里云secret">
        <el-input v-model="keySet.secret"></el-input>
      </el-form-item>
      <el-form-item label="所在区域">
        <el-select v-model="keySet.region" placeholder="请选择所在区域">
          <el-option label="上海数据中心" value="shanghai"></el-option>
          <el-option label="杭州数据中心" value="hangzhou"></el-option>
          <el-option label="青岛数据中心" value="qingdao"></el-option>
          <el-option label="北京数据中心" value="beijing"></el-option>
          <el-option label="香港数据中心" value="hongkong"></el-option>
          <el-option label="深圳数据中心" value="shenzhen"></el-option>
        </el-select>
      </el-form-item>
      <!-- 当前文件路径 -->
      <el-form-item label="当前文件路径">
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const OSS = require('ali-oss')
var client = new OSS({
  //以下请输入自己的配置
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI5tB5S5bak'+'4Q325o4EgcR',
  accessKeySecret: 'o0CvstEPN7a1hO'+'SugTlaNhAfjnKdvH',
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
      testValue: 'testValue',
      keySet: {
        bucket: 'suqiqi',
        key: '',
        region: 'beijing',
        secret: '',
      },
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
    // keySet
    keySet: {
      handler: function(val) {
        //do something
        // console.log("改变了")
        // console.log(val)
        
        // client = new OSS({
        //   //以下请输入自己的配置
        //   region: val.region,
        //   accessKeyId: val.accessKeyId,
        //   accessKeySecret: val.accessKeySecret,
        //   bucket: val.bucket,
        // })
        // console.log(client)
      },
      deep: true,
    },
  },
}
</script>
<style scoped></style>
