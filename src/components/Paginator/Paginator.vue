<template>
  <div class="paginator">
    <oval
      v-for="p in pageNumber"
      :page="p - 1"
      :current-page="currentPage"
      :key="`paginator-p-${p - 1}`"
      :onClick="(e) => changePage(p - 1)"
      :active-color="ovalActiveColor"
      :inactive-color="ovalInactiveColor"
    />
  </div>
</template>

<script>
import Oval from './Oval'

export default {
  name: 'Paginator',

  components: {
    Oval,
  },

  props: {
    currentPage: {
      type: Number,
      default: 0,
    },

    pageNumber: {
      type: Number,
      default: 0,
    },

    ovalActiveColor: {
      type: String,
      default: '',
    },

    ovalInactiveColor: {
      type: String,
      default: '',
    },
  },

  methods: {
    changePage(p) {
      this.$emit('changepage', {
        page: p,
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.paginator
  display: flex
  justify-content: center
</style>
