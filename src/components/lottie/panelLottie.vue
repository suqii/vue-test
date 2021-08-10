<template>
  <div class="card-panel" @mouseenter="lottiePlay" @mouseleave="lottieStop">
    <div class="card-panel-icon-wrapper icon-shoppingCard">
      <lottie
        :options="defaultOptions"
        :height="height"
        :width="width"
        v-on:animCreated="handleAnimation"
      />
    </div>
  </div>
</template>

<script>
import Lottie from './lottie.vue'
// import * as animationData from '../assets/json/api.json'
export default {
  props: {
    animationDataPath: {
      type: Object,
      default: null,
    },
    height: Number,
    width: Number,
  },
  components: {
    Lottie,
  },
  data() {
    return {
      defaultOptions: {
        // animationData: animationDataPath,
        animationData: this.animationDataPath,
        autoplay: false,
        loop: false,
      },
      // height: this.height,
      // width:80,
    }
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim
    },

    stop: function() {
      this.anim.stop()
    },

    play: function() {
      this.anim.play()
    },

    pause: function() {
      this.anim.pause()
    },
    lottiePlay: function() {
      this.anim.play()
    },
    lottieStop: function() {
      this.anim.stop()
    },
  },
}
</script>

<style lang="less" scoped>
.card-panel {
  // height: 140px;
  width: 80px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: rgb(255, 255, 255);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  // border: 1px red solid;
  transition: transform 0.5s;
  .card-panel-icon-wrapper {
    color: #fff;
  }
  .icon-people {
    background: #40c9c6;
  }
  .icon-message {
    background: #36a3f7;
  }
  .icon-money {
    background: #f4516c;
  }
  .icon-shoppingCard {
    background: #2da2f8;
  }
  &:hover {
    transition: transform 0.5s;
    transform: translateY(-5px);
    box-shadow: 0 1px 18px rgba(0, 0, 0, 0.1), 0 5px 30px rgba(0, 0, 0, 0.09);
  }
  .icon-people {
    color: #40c9c6;
  }
  .icon-message {
    color: #36a3f7;
  }
  .icon-money {
    color: #f4516c;
  }
  .icon-shoppingCard {
    color: #34bfa3;
  }
  .card-panel-icon-wrapper {
    float: left;
    // margin: 14px 0 0 14px;
    // padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }
  .card-panel-icon {
    float: left;
    font-size: 48px;
  }
}
</style>
