<template>
  <div class="mask">
    <lottie
      :options="defaultOptions"
      :height="200"
      :width="200"
      v-on:animCreated="handleAnimation"
      class="lottie"
    />
    <!-- <div class="lottie">a</div> -->
  </div>
</template>

<script>
import * as animationData from '../assets/lottie/demo1.json' // 引入data.json
// import * as lottieData from '../assets/lottie/' // 引入data.json

export default {
  name: 'robotLottie',
  data() {
    return {
      defaultOptions: { animationData: animationData.default,autoplay: true,loop:true},
      animationSpeed: 1,   /*动画速度*/
    }
  },
  props: [],
  computed: {},
  methods: {
    handleAnimation: function(anim) {

      this.anim = anim
      this.anim.setSpeed(this.animationSpeed);
    },
   
  },
}
</script>

<style scoped>
.mask {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
  /* border: 1px red solid; */
}
.lottie {
 
}
</style>
