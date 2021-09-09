<template>
<div>
  <div v-for="(item, index) in arry" :key="index" class="arry">{{item}}</div>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 7, 10]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      arry: [],
      currentPage: 4,
      total:10
    }
  },
  props: [],
  mounted() {
    for (var i = 0; i <= 20; i++) {
      this.arry.push(i)
    }
    console.log(this.arry)
    this.total = this.arry.length
  },
  computed: {},
  methods: {
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.arry = this.arry.slice(0,val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
}
</script>

<style scoped>
.arry{
  background: greenyellow;
  text-align: center;
  margin: 1em;
}
</style>
