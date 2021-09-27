<template>
  <div id="uploadimg">
    <!-- <el-upload
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
    /> -->
  </div>
</template>

<script>

export default {
  name: 'alioss',
  data() {
    return {
      showViewer: true,
      showlist: [],
      imgList: [],
      picList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
    }
  },
  props: [],
  computed: {},
  methods: {
    
   
  },
}
</script>

<style scoped>

</style>
