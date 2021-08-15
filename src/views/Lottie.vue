<template>
  <div class="big">
    <panel-lottie
      :animationDataPath="animationDataPathFive"
      :h="100"
      :w="100"
      :autoplay="false"
      :className="1"
      :loop="true"
      :title="'我是文本'"
      :number="2020"
      
    ></panel-lottie>
    
  </div>
</template>

<script>
import panelLottie from '../components/lottie/panelLottie.vue'
export default {
  name: 'index',
  components: {
    panelLottie,
  },
  data() {
    return {
      // 导入lottie动画json
      animationDataPathOne: require('../assets/json/compass.json'),
      animationDataPathTwo: require('../assets/json/api.json'),
      animationDataPathThree: require('../assets/json/dev.json'),
      animationDataPathFour: require('../assets/json/update.json'),
      animationDataPathFive: require('../assets/json/search.json'),
    }
  },
}
</script>

<style lang="less">
.big{
  background-color: rgb(240, 242, 245);
}
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
}

.admin-about {
  padding: 32px;
  background-color: rgba(240, 242, 245, 1);
}

.lottie {
  height: 100%;
}
</style>
