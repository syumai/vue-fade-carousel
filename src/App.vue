<template>
  <div id="app">
    <fade-carousel
      container-class="container"
      page-container-class="page-container"
      :fade-out-delay="3000"
    >
      <div class="cell">1</div>
      <div class="cell">2</div>
      <div class="cell">3</div>
      <div class="cell">4</div>
      <div class="cell">5</div>
      <div class="cell">6</div>
      <div class="cell">7</div>
      <div class="cell">8</div>
      <div class="cell">9</div>
      <div class="cell">10</div>
    </fade-carousel>
  </div>
</template>

<script>
import FadeCarousel from './components/FadeCarousel.vue'
import Cell from './components/Cell.vue'

export default {
  name: 'app',
  components: {
    FadeCarousel,
  },
}
</script>

<style lang="stylus">
cell-size = 100px
margin-size = 5px

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
  width: 100%
  .container
    height: cell-size + margin-size * 2
    .page-container
      width: 100%
      height: cell-size + margin-size * 2
      display: flex
      justify-content: center
      .cell
        display: flex
        justify-content: center
        align-items: center
        width: cell-size
        height: cell-size
        background-color: #42b983
        color: #fff
        margin: margin-size
        cursor: pointer
        &:hover
          color: rgba(255, 255, 255, 0.6)

</style>
