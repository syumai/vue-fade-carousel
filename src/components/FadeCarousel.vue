<template>
  <div class="fade-carousel">
    <div class="cells-container" :class="containerClass" ref="container">
      <slot/>
        <div
          class="page-container"
          :class="pageContainerClass"
          v-for="(page, pageIndex) in pages"
          :key="`page-${pageIndex}`"
        >
          <cell
            v-for="(c, cellIndex) in page"
            :key="`cell-${cellIndex}`"
            :cell-data="c"
            :visible="!hidden && cells.length > 0 && currentPage === pageIndex"
            :per="per"
            :fade-speed="fadeSpeed"
            :fade-gap="fadeGap"
          />
        </div>
    </div>
    <paginator
      :pageNumber="pageNumber"
      :current-page="currentPage"
      ref="paginator"
    />
  </div>
</template>

<script>
import Paginator from './Paginator/Paginator.vue'
import Cell from './Cell.vue'

const convertCells = container => {
  const children = Array.from(container.children)
  const pageNumber = children.length
  return children.map((cell, index) => ({
      html: cell.innerHTML,
      className: cell.className,
      index,
      pageNumber,
  }))
}

const removeOriginalCells = container => Array
  .from(container.children)
  .forEach(cell => container.removeChild(cell))

export default {
  name: 'FadeCarousel',

  data() {
    return {
      currentPage: 0,
      cells: [],
      timerHandle: null,
      hidden: false,
    }
  },

  props: {
    per: {
      type: Number,
      default: 2,
    },
    containerClass: {
      type: String,
      default: '',
    },
    pageContainerClass: {
      type: String,
      default: '',
    },
    fadeSpeed: {
      type: Number,
      default: 400,
    },
    fadeGap: {
      type: Number,
      default: 200,
    },
    startUpDelay: {
      type: Number,
      default: 600,
    },
    fadeOutDelay: {
      type: Number,
      default: 5000,
    },
    autoplay: {
      type: Boolean,
      default: true,
    }
  },

  components: {
    Paginator,
    Cell,
  },

  computed: {
    visibleCells() {
      const start = this.currentPage * this.per
      const end = (this.currentPage + 1) * this.per
      const cells = this.cells.slice(start, end)
      return cells
    },
    cellsCount() {
      return this.cells.length
    },
    pages() {
      const pages = []
      this.cells.forEach((cell, index) => {
        if (index % this.per === 0) {
          pages.push([])
        }
        pages[pages.length - 1].push(cell)
      })
      return pages
    },
    pageNumber() {
      return Math.ceil(this.cellsCount / this.per)
    },
    isPlaying() {
      return this.timerHandle !== null
    },
    firstPage() {
      return 0
    },
    lastPage() {
      return this.pageNumber - 1
    },
    nextPage() {
      if (this.currentPage === this.isLastPage) {
        return this.firstPage
      }
      return this.currentPage + 1
    },
    prevPage() {
      if (this.currentPage === this.firstPage) {
        return this.lastPage
      }
      return this.currentPage - 1
    }
  },

  methods: {
    goToNextPage() {
      if (this.currentPage === this.lastPage) {
        this.currentPage = this.firstPage
        return
      }
      this.currentPage++
    },
    isVisiblePage(pageIndex) {
      const { currentPage } = this
      switch (currentPage) {
        case pageIndex:
        return true
        case this.firstPage:
        return pageIndex === this.lastPage || pageIndex === this.currentPage + 1
        case this.lastPage:
        return pageIndex === this.firstPage || pageIndex === this.currentPage - 1
        default:
        return currentPage + 1 === pageIndex || currentPage - 1 === pageIndex
      }
    },
    hide() {
      this.hidden = true
    },
    show() {
      this.hidden = false
    },
    play() {
      if (this.isPlaying) {
        console.error('already playing')
        return
      }
      this.timerHandle = window.setInterval(() => {
        this.goToNextPage()
      }, this.fadeOutDelay)
    },
    pause() {
      if (!this.isPlaying) {
        console.error('not playing')
        return
      }
      window.clearInterval(this.timerHandle)
      this.timerHandle = null
    },
    replay() {
      if (this.isPlaying) {
        this.pause()
      }
      this.play()
    },
  },

  mounted() {
    const { container } = this.$refs
    if (container) {
      const cells = convertCells(container)
      removeOriginalCells(container)
      this.cells.push(...cells)
    }
    if (this.autoplay) {
      this.hide()
      window.setTimeout(() => {
        this.show()
        this.play()
      }, this.startUpDelay)
    }
    this.$refs.paginator.$on('changepage', ({ page }) => {
      this.currentPage = page
      this.replay()
    })
  }
}
</script>

<style lang="stylus" scoped>
.fade-carousel
  width: 100%
  .cells-container
    display: flex
    width: 100%
    justify-content: center
    position: relative
    .page-container
      position: absolute
      width: 100%
      top: 0
      left: 0
</style>
