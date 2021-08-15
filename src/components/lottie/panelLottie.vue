<template>
  <div class="card-panel" @mouseenter="lottiePlay" @mouseleave="lottieStop">
    <!-- lottie -->
    <div
      id="chooselabel"
      :class="[
        className == '1'
          ? 'card-panel-icon-wrapper icon-shoppingCard'
          : 'card-panel-icon-wrapper icon-money',
      ]"
      :style="'height:' + h + 'px;' + 'width:' + w + 'px;'"
    >
      <lottie
        :options="defaultOptions"
        :h="h"
        :w="w"
        @animCreated="handleAnimation"
      />
    </div>
    <div class="card-panel-description">
      <div class="card-panel-text">
        {{ title }}
      </div>
      <div class="card-panel-num">
        {{ number }}
      </div>
      <!-- <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" /> -->
    </div>
  </div>
</template>

<script>
import Lottie from './lottie.vue'
export default {
  components: {
    Lottie
  },
  props: {
    animationDataPath: {
      type: Object,
      default: null
    },
    // eslint-disable-next-line vue/require-default-prop
    className: Number,
    // eslint-disable-next-line vue/require-default-prop
    h: Number,
    // eslint-disable-next-line vue/require-default-prop
    w: Number,
    autoplay: Boolean,
    loop: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    title: String,
    // eslint-disable-next-line vue/require-default-prop
    number: Number
  },
  data() {
    return {
      defaultOptions: {
        // animationData: animationDataPath,
        animationData: this.animationDataPath,
        autoplay: this.autoplay,
        loop: this.loop
      }
      // className = this.className
    }
  },
  // mounted() {
  //   console.log(this.className)
  // },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim
    },

    stop: function() {
      this.anim.stop()
    },

    play: function() {
      this.anim.play()
      // document.getElementById('chooselabel').style.background = 'red'
    },

    pause: function() {
      this.anim.pause()
    },
    lottiePlay: function() {
      this.anim.play()
    },
    lottieStop: function() {
      this.anim.stop()
    }
  }
}
</script>

<style lang="less" scoped>
.card-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 108px;
  width: 400px;
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
  // add bg color
  .card-panel-icon-wrapper {
    color: #666;
    // border: 1px red solid;
    margin-left:2em ;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
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
    // background: #2da2f8;
  }
  // hover change color
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
  .icon-shoppingCard :hover{
    // color: #34bfa3;
    background: black;
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

.card-panel-description {
  font-weight: bold;
  margin: 26px;
  margin-left: 0px;
  text-align: center;
  .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }

  .card-panel-num {
    font-size: 20px;
  }
}
</style>
