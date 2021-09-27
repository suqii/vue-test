<template>
  <div class="retuenImgs">
    <el-cascader
      v-model="value"
      :options="options"
      :props="{ expandTrigger: 'hover' }"
      @change="handleChange"
    ></el-cascader>

    <div
      class="demo-image__preview"
      v-for="(item, index) in imgListInfo"
      :key="index"
    >
      <el-image
        class="image-item"
        style="width: 120px; height: 120px;"
        fit="cover"
        :src="item.url"
        :preview-src-list="imgList"
      >
      </el-image>
      <div>{{item.name}}</div>
    </div>
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

export default {
  name: 'uploadimg',
  components: {},
  props: ['list', 'uploadpic', 'limit'],
  data() {
    return {
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
          value: 'MK',
          label: 'Markdown图片',
        },
      ],
      showViewer: false,
      showlist: [],
      imgList: [],
      imgListInfo: [],
      picList: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
      ],
    }
  },
  created() {
    this.getimgdata()
  },
  mounted() {
    this.fileList1('MK')
  },

  methods: {
    // 选中
    handleChange(value) {
      console.log(value)
      let _this = this
      _this.path = ''
      value.forEach(function(e) {
        _this.path += e + '/'
      })
      console.log(_this.path)
      this.fileList1(_this.path)
    },
    // 文件列表
    async fileList1(prefix, marker) {
      this.imgList = []
      try {
        // 不带任何参数，默认最多返回1000个文件
        let result = await client.list()
        // 根据nextMarker继续列出文件
        // if (result.isTruncated) {
        //   result = await client.list({ marker: result.nextMarker })
        // }
        // 列出前缀为'test'且在'headImg'之后的文件
        result = await client.list({
          prefix,
          marker: '',
        })
        this.imgListInfo = result.objects
        result.objects.forEach((row) => {
          this.imgList.push(row.url)
        })
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
      for (let i in this.showlist) {
        this.picList.push(this.showlist[i].url)
      }
      // console.log('获取图片')
      // console.log(this.imgList)
      // this.imgList.forEach((item) => {
      //   console.log(item.url)
      //   // this.picList.push(item.url)
      // })
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
<style scoped>
.retuenImgs {
  /* border: 1px red solid; */
  display: flex;
  flex-wrap: wrap;
}
.demo-image__preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  /* border: 1px red solid; */
  width: 10em;
}
</style>
