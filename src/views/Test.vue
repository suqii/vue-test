<template>
  <div class="hello">
    <el-form>
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="数字">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        number: null,
      },
    }
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log(this.form)
    },
  },
}
</script>

<style></style>
