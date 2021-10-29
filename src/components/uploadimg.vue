<template>
  <div>
    <!-- 表头 -->
    <el-row>
      <el-col :span="24"
        ><div class="grid-content header">阿里OSS文件上传</div></el-col
      >
    </el-row>
    <!-- 内容 -->
    <el-row :gutter="15">
      <!-- 左边选项区 -->
      <el-col :span="11" class="divided"
        ><div class="grid-content left-con">
          <el-form ref="form">
            <!-- bucket选择 -->
            <el-form-item label="阿里云bucket">
              <el-input v-model="keySet.bucket"></el-input>
            </el-form-item>
            <!-- bucket选择 -->
            <!-- <el-form-item label="testValue">
            <el-input v-model="testValue"></el-input>
          </el-form-item> -->
            <!-- key -->
            <el-form-item label="阿里云key">
              <el-input v-model="keySet.accessKeyId"></el-input>
            </el-form-item>
            <!-- secret -->
            <el-form-item label="阿里云secret">
              <el-input v-model="keySet.accessKeySecret"></el-input>
            </el-form-item>
            <!-- 区域选择 -->
            <el-form-item label="所在区域">
              <el-select v-model="keySet.region" placeholder="请选择所在区域">
                <el-option
                  label="上海数据中心"
                  value="oss-cn-shanghai"
                ></el-option>
                <el-option
                  label="杭州数据中心"
                  value="oss-cn-hangzhou"
                ></el-option>
                <el-option
                  label="青岛数据中心"
                  value="oss-cn-qingdao"
                ></el-option>
                <el-option
                  label="北京数据中心"
                  value="oss-cn-beijing"
                ></el-option>
                <el-option
                  label="香港数据中心"
                  value="oss-cn-hongkong"
                ></el-option>
                <el-option
                  label="深圳数据中心"
                  value="oss-cn-shenzhen"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 路径选择 -->
            <el-form-item label="当前文件路径">
              <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
            <!-- 图片路径 -->
            <el-form-item label="图片url">
              <el-input v-model="selectImgUrl"></el-input>
            </el-form-item>
            <!-- 连接测试 -->
            <el-button type="primary" @click="concetOss" size="mini"
              >连接</el-button
            >
          </el-form>
        </div></el-col
      >
      <el-col :span="1">
        <el-divider direction="vertical"></el-divider>
      </el-col>
      <!-- 右边内容区 -->
      <el-col :span="12">
        <!-- 已经连接 -->
        <div v-if="!nothingFlag" class="grid-content right-con">
          <el-form>
            <!-- 当前路径下的文件 -->
            <el-form-item label="">
              <el-upload
                action="''"
                list-type="picture-card"
                :http-request="uploadpic"
                :before-upload="beforeAvatarUpload"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleRemove"
                :file-list="showlist"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-image-viewer
                v-if="showViewer"
                :on-switch="picSwitch"
                :on-close="closeViewer"
                :url-list="picList"
              />
            </el-form-item>
          </el-form>
        </div>
        <!-- 未连接 -->
        <el-empty
          v-else
          :image-size="500"
          image="https://z3.ax1x.com/2021/10/13/5KypXF.png"
          description="还未连接，暂无数据"
        ></el-empty>
      </el-col>
    </el-row>
  </div>
</template>
<script>
const OSS = require('ali-oss')
var client = new OSS({
  //以下请输入自己的配置
  region: 'oss-cn-beijing',
  accessKeyId: 'id',
  accessKeySecret: 'secret',
  bucket: 'suqiqi',
})
//element-ui  upload修改预览功能，需安装element-ui
//说明：
//  uploadpic：父组件传入upload方法
//  list：父组件传入图片列表
//  limit：父组件传入图片大小限制
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
const accessKeyId = 'id'
const accessKeySecret = 'secret'
export default {
  name: 'uploadimg',
  components: { ElImageViewer },
  props: ['list', 'uploadpic', 'limit'],
  data() {
    return {
      value: ['freeFind'],
      options2: [],
      nothingFlag: true,
      optionItem: {
        value: 'test',
        label: '测试',
        children: [],
      },
      options: [
        {
          value: 'freeFind',
          label: 'freeFind',
        },
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
      testValue: null,
      keySet: {
        region: 'oss-cn-beijing',
        accessKeyId: accessKeyId.replace(/6/g, '5'),
        accessKeySecret: accessKeySecret.replace(/6/g, 'a'),
        bucket: 'suqiqi',
      },
      showViewer: false,
      selectImgUrl: '',
      showlist: [],
      imgList: [],
      picList: [],
    }
  },
  created() {
    // this.fileList('MK')
  },
  mounted() {
    // this.filePathList()
    // this.test('test/')
  },

  methods: {
    // 连接测试
    concetOss() {
      console.log('连接测试')
      // console.log(this.keySet)
      client = new OSS(this.keySet)
      // console.log(client)
      // this.fileList()
      this.fileList('freeFind')
    },
    // 选中
    handleChange(value) {
      console.log(value)
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
        this.nothingFlag = false
        this.getimgdata()
      } catch (e) {
        // console.log(e.toString())
        let failReson = null
        switch (e.toString()) {
          case 'InvalidAccessKeyIdError: The OSS Access Key Id you provided does not exist in our records.':
            failReson = '您提供的OSS访问密钥Id在记录中不存在。'
            break
          case 'SignatureDoesNotMatchError: The request signature we calculated does not match the signature you provided. Check your key and signing method.':
            failReson = '您提供的OSS访问密钥与Key不匹配。'
            break
          default:
            break
        }
        this.$message({
          message: '连接失败！' + '失败原因：' + failReson,
          type: 'warning',
        })
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
      this.$message({
        message: '文件获取成功',
        type: 'success',
        duration: 700,
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
    //切换每一张时触发
    picSwitch(val) {
      // console.log(val)
      this.selectImgUrl = this.picList[val]
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
<style scoped>
.header {
  /* border: 1px red solid; */
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 1em;
}
.divided {
  /* background: #000; */
  /* border-right: 1px black solid; */
}
.el-row {
  /* height: 100vh; */
}
.el-col {
  height: 100%;
  /* border-right: 1px black solid; */
}
/* 分割线 */
.el-divider--vertical {
  /* background: #000; */
  /* display:inline-block; */
  /* width:1px; */
  /* height: 100%; */
  height: 500px;
  /* margin:0 8px; */
  /* vertical-align:middle;  */
  /* position:relative; */
}
</style>
