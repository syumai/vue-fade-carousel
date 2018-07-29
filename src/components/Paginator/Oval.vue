<template>
  <div
    :class="className"
    :page="page"
    @click="onClick"
    :style="styleObj"
  />
</template>

<script>
export default {
  name: 'Oval',

  props: {
    currentPage: {
      type: Number,
      default: 0,
    },

    page: {
      type: Number,
      default: 0,
    },

    onClick: {
      type: Function,
      default: () => {},
    },

    activeColor: {
      type: String,
      default: '',
    },

    inactiveColor: {
      type: String,
      default: '',
    },
  },

  computed: {
    isActive() {
      return this.page === this.currentPage
    },
    className() {
      const classBase = ['oval']
      if (this.isActive) {
        classBase.push('active')
      }
      return classBase
    },

    styleObj() {
      const style = {}
      if (this.isActive) {
        if (this.activeColor) {
          style.backgroundColor = this.activeColor
        }
      } else {
        if (this.inactiveColor) {
          style.backgroundColor = this.inactiveColor
        }
      }
      return style
    }
  },
}
</script>

<style lang="stylus" scoped>
radius = 10
colors = {
  active: #99f
  inactive: #ccc
}

.oval
  width: (radius)px
  height: (radius)px
  border-radius: (radius / 2)px
  margin: (radius / 4)px
  background-color: colors.inactive
  &:not(.active)
    cursor: pointer
    &:hover
      opacity: 0.8
  &.active
    cursor: default
    pointer-events: none
    background-color: colors.active
</style>
