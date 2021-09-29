<template>
  <div id="uploadimg">
    <el-form ref="form">
      <!-- bucket选择 -->
      <el-form-item label="阿里云bucket">
        <el-input v-model="keySet.bucket"></el-input>
      </el-form-item>
      <!-- key -->
      <el-form-item label="阿里云key">
        <el-input v-model="keySet.accessKeyId"></el-input>
      </el-form-item>
      <!-- <el-form-item label="testValue">
        <el-input v-model="testValue"></el-input>
      </el-form-item> -->
      <!-- secret -->
      <el-form-item label="阿里云secret">
        <el-input v-model="keySet.accessKeySecret"></el-input>
      </el-form-item>
      <!-- 区域选择 -->
      <el-form-item label="所在区域">
        <el-select v-model="keySet.region" placeholder="请选择所在区域">
          <el-option label="上海数据中心" value="oss-cn-shanghai"></el-option>
          <el-option label="杭州数据中心" value="oss-cn-hangzhou"></el-option>
          <el-option label="青岛数据中心" value="oss-cn-qingdao"></el-option>
          <el-option label="北京数据中心" value="oss-cn-beijing"></el-option>
          <el-option label="香港数据中心" value="oss-cn-hongkong"></el-option>
          <el-option label="深圳数据中心" value="oss-cn-shenzhen"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="concetOss" size="mini"
        >连接测试</el-button
      >
      <!-- 路径选择 -->
      <el-form-item label="当前文件路径">
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <!-- 当前路径下的文件 -->
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
    </el-form>
  </div>
</template>
<script>
const OSS = require('ali-oss')
var client = new OSS({
  //以下请输入自己的配置
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI5tB5S5bak' + '4Q325o4EgcR',
  accessKeySecret: 'o0CvstEPN7a1hO' + 'SugTlaNhAfjnKdvH',
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
      options2: [],
      optionItem: {
        value: 'test',
        label: '测试',
        children: [],
      },
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
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAI5tB5S5bak' + '4Q325o4EgcR',
        accessKeySecret: 'o0CvstEPN7a1hO' + 'SugTlaNhAfjnKdvH',
        bucket: 'suqiqi',
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
  mounted() {
    // this.filePathList()
    // this.test('test/')
  },

  methods: {
    // 连接测试
    concetOss() {
      console.log('连接测试')
      console.log(this.keySet)
      client = new OSS(this.keySet)
      console.log(client)
    },
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
        // console.log(this.imgList)
        this.getimgdata()
      } catch (e) {
        console.log(e)
      }
    },
    // 获取根目录列表
    async filePathList(prefix, marker) {
      let _this = this
      let options2 = []
      let optionItem = {
        value: 'test',
        label: '测试',
        children: [],
      }
      try {
        // 返回当前文件夹下的文件
        let rootPathGet = await client.list({
          prefix: '',
          delimiter: '/',
        })
        let rootPath = rootPathGet.prefixes
        rootPath.forEach((item) => {
          optionItem.value = item
          optionItem.label = item
          options2.push(optionItem)
          // this.test(item).then(
          //   function(data) {
          //     // console.log('回调成功')
          //     console.log(data.prefixes)
          //     if(data.prefixes){
          //       console.log("继续")
          //     }else{
          //     }
          //   },
          //   function() {
          //     // console.log('回调失败')
          //   }
          // )
        })
        console.log(options2)
        // console.log(rootPath)
      } catch (e) {
        console.log(e)
      }
    },

    // 获取子目录列表
    async getPathLists(prefix) {
      try {
        let pathLists = await client.list({
          prefix: prefix,
          delimiter: '/',
        })
        console.log(pathLists.prefixes)
        return pathLists.prefixes
      } catch (e) {
        console.log(e)
      }
    },
    // 获取子目录列表
    async test(prefix) {
      let _this = this
      let options2 = []
      let optionItem = {
        value: 'test',
        label: '测试',
        children: [],
      }
      return await new Promise(function(resolve, reject) {
        let rootPathGet = client.list({
          prefix: prefix,
          delimiter: '/',
        })
        rootPathGet.then(
          function(data) {
            console.log(data.prefixes)
            // // 如果还有子文件
            if (data.prefixes) {
              console.log('还有子文件')
              data.prefixes.forEach((item) => {
                optionItem.value = item
                optionItem.label = item
                _this.options2.push(optionItem)
                _this.test(item)
              })
            } else {
              console.log('无子文件')
            }
            // 输出结果
            console.log('结果输出为下：')
            console.log(_this.options2)
          },
          function() {
            // console.log('回调失败')
          }
        )
        resolve(rootPathGet)
      })
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
        // console.log('改变了')
        // console.log(val)
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
