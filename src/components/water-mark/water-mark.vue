<template>
  <div
    ref="waterMark"
    class="v-water-mark"
  />
</template>
<script>
export default {
  name: 'VWaterMark',
  props: {
    text: {
      type: String,
      default: ''
    },
    rotate: {
      type: Number,
      default: -0.2
    },
    fillLeft: {
      type: Number,
      default: 0
    },
    fillTop: {
      type: Number,
      default: 50
    },
    width: {
      type: [Number, String],
      default: 120
    },
    height: {
      type: [Number, String],
      default: 50
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    fontFamily: {
      type: String,
      default: '字体'
    },
    fillStyle: {
      type: String,
      default: '#ddd'
    },
    // 笔触的颜色
    strokeStyle: {
      type: String,
      default: '#ddd'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.text) return
      const canvas = document.createElement('canvas')
      canvas.width = this.width
      canvas.height = this.height
      const context = canvas.getContext('2d')
      context.fillStyle = this.fillStyle
      context.strokeStyle = this.strokeStyle
      context.font = `${this.fontSize} '${this.fontFamily}'`
      context.rotate(this.rotate)
      context.fillText(this.text, this.fillLeft, this.fillTop)

      this.$refs.waterMark.style.backgroundImage = `url(${canvas.toDataURL()})`
    }
  }
}

</script>
<style lang="scss">
.v-water-mark {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0.7;
  z-index: 99999;
  overflow: hidden;
  pointer-events: none;
}

</style>
