<template>
  <div
    :class="[cellData.className, visibleClassName]"
    :style="styleObj"
    v-html="cellData.html"
  />
</template>

<script>
export default {
  name: 'Cell',

  props: {
    cellData: {
      type: Object,
      default: {
        html: '',
        className: '',
        index: 1,
        pageNumber: 1,
      },
    },
    visible: {
      type: Boolean,
      default: false,
    },
    per: {
      type: Number,
      // default value is in FadeCarousel.vue
    },
    fadeSpeed: {
      type: Number,
      // default value is in FadeCarousel.vue
    },
    fadeGap: {
      type: Number,
      // default value is in FadeCarousel.vue
    },
  },

  computed: {
    styleObj() {
      const indexInPage = this.cellData.index % this.per
      const fadeGap = indexInPage * this.fadeGap / 1000
      return {
        transitionDuration: `${this.fadeSpeed / 1000}s`,
        transitionDelay: `${fadeGap}s`,
        filter: `hue-rotate(${this.cellData.index / this.cellData.pageNumber * 360}deg)`,
      }
    },

    visibleClassName() {
      return this.visible ? '' : 'invisible'
    }
  }
}
</script>

<style lang="stylus" scoped>
div
  opacity: 1
  transition-property: opacity
  &.invisible
    opacity: 0
</style>
