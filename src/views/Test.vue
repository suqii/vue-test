<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">1</div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light">2</div></el-col>
  </el-row>
</template>

<script>
export default {
  name: 'uploadimg',
  components: {},
  props: ['list', 'uploadpic', 'limit'],
  data() {
    return {
      value: ['test', 'testChild', 'testChild1'],
    }
  },
  created() {},
  mounted() {},

  methods: {},
  watch: {},
}
</script>
<style scoped>


.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

</style>
