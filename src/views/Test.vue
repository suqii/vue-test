<template>
  <div class="hello">
    <el-upload
      action="/oss"
      :http-request="httpRequest"
      list-type="picture-card"
      :limit="1"
      :on-remove="handleRemove"
      :on-change="onChange"
      :class="{ hide: showUpload }"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      showUpload: false,
      picFile: null,
      fd: {},
    }
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log('handleRemove')
      if (fileList.length < 1) {
        this.showUpload = false
      }
    },
    onChange(file, fileList) {
      // console.log('onChange')
      // console.log(file)
      this.picFile = file
      if (fileList.length >= 1) {
        this.showUpload = true
      }
    },
    httpRequest(param) {
      console.log('httpRequest')
      const fd = new FormData()// FormData 对象
      this.fd = fd
      this.fd.append('file', param.file)
      console.log(this.fd)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello >>> .hide .el-upload--picture-card {
  display: none;
}
</style>
