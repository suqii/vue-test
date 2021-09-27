<template>
  <div class="hello">
    <uploadimg :list.sync="list" :uploadpic="uploadpic" :limit="limit" />
    <el-form>
      <el-form-item label="">
        <el-button type="primary" @click="fileList" size="mini"
          >文件列表</el-button
        >
        <el-button type="primary" @click="listDir" size="mini"
          >listDir</el-button
        >
        <el-button type="primary" @click="deleteImg" size="mini"
          >删除</el-button
        >
        <el-button type="primary" @click="deleteMulti" size="mini"
          >批量删除</el-button
        >
      </el-form-item>

      <el-form-item label="路径">
        <el-cascader
          v-model="value"
          :options="fileOptions"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-image
        v-for="url in imgList"
        :key="url.url"
        :src="url.url"
        lazy
        style="width:100px;"
      ></el-image>
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
  name: 'Test',
  components: { uploadimg },
  data() {
    return {
      list: [],
      testList: [],
      imgList: [],
      limit: 2,
      path: '',
      value: [],
      fileOptions: [],
    }
  },
  methods: {
    uploadpic(file) {
      client
        .put(file.file.name, file.file)
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
      console.log(_this.path)
    },
    // 图片删除
    async deleteImg() {
      try {
        let result = await client.delete('test/headImg/head_ (1).jpg')
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    },
    // 图片批量删除
    async deleteMulti() {
      try {
        let result = await client.deleteMulti(['test/headImg/head_ (2).jpg', 'test/testChild/testChild2/8ddb50c7b630bafdadb34e12b7a074c8.jpg'], {
          quiet: true,
        })
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    },

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
      } catch (e) {
        console.log(e)
      }
    },
    // 列出指定目录下的文件和子目录
    async listDir(dir) {
      let _this = this
      try {
        let result = await client.list({
          prefix: dir,
          delimiter: '/',
        })
        // 当前目录信息
        if (result.prefixes) {
          // console.log('当前目录有值')
          // 目录
          result.prefixes.forEach(function(subDir) {
            console.log('SubDir: %s', subDir)
            // 数据添加
            // let fileOption = {
            //   value: null,
            //   label: null,
            // }
            // fileOption.value = subDir
            // fileOption.label = subDir
            // _this.fileOptions.push(fileOption)
            // _this.testList.push(subDir)
          })

          _this.testList.forEach((item, index) => {
            this.listDirItem(item).then(
              (result) => {
                // console.log(result)
                _this.testList[index] = result
                console.log(_this.testList)
              },
              (reason) => {
                console.log(reason)
                // onRejected 不会被调用
              }
            )
          })
        }

        // 文件
        result.objects.forEach(function(obj) {
          // console.log('Object: %s', obj.name)
        })
      } catch (e) {
        console.log(e)
        return
      }
    },
    async listDirItem(dir) {
      let _this = this
      try {
        let result = await client.list({
          prefix: dir,
          delimiter: '/',
        })
        if (result.prefixes) {
          result.prefixes.forEach(function(subDir) {
            //  console.log(subDir)
            _this.path = subDir

            // _this.listDirItem(subDir)
          })
        } else {
          _this.testList.push(_this.path)
        }

        console.log(_this.testList)
      } catch (e) {
        console.log(e)
        return
      }
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
