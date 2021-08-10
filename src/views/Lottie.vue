<template>
  <div>
    <panel-lottie
      :animationDataPath="animationDataPathOne"
      :height="40"
      :width="40"
    ></panel-lottie>
    <panel-lottie
      :animationDataPath="animationDataPathOne"
      :height="60"
      :width="60"
    ></panel-lottie>
    <panel-lottie
      :animationDataPath="animationDataPathOne"
      :height="80"
      :width="80"
    ></panel-lottie>
    <panel-lottie :animationDataPath="animationDataPathTwo"></panel-lottie>
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
      animationDataPathOne: require('../assets/json/compass.json'),
      animationDataPathTwo: require('../assets/json/api.json'),
      animationDataPathThree: require('../assets/json/dev.json'),
      animationDataPathFour: require('../assets/json/update.json'),
    }
  },
}
</script>

<style lang="less">
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
