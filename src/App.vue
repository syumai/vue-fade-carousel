<template>
  <div id="app">
    <fade-carousel
      container-class="container"
      page-container-class="page-container"
      :per="per"
      :fade-out-delay="fadeOutDelay"
      :fade-speed="fadeSpeed"
      :fade-gap="fadeGap"
      :start-up-delay="startUpDelay"
      :autoplay="true"
      ref="carousel"
    >
      <div :class="`cell i-${i}`" v-for="i in cellNumbers" :key="`cell-${i}`">
        {{i}}
      </div>
    </fade-carousel>
    <div class="form-container">
      <form>
        <vue-form-field title="cells per page">
          <vue-input type="number" v-model.number="per"/>
        </vue-form-field>
        <vue-form-field title="fade out delay (ms)">
          <vue-input type="number" v-model.number="fadeOutDelay"/>
        </vue-form-field>
        <vue-form-field title="fade speed (ms)">
          <vue-input type="number" v-model.number="fadeSpeed"/>
        </vue-form-field>
        <vue-form-field title="fade gap (ms)">
          <vue-input type="number" v-model.number="fadeGap"/>
        </vue-form-field>
        <div class="button-container">
          <vue-button class="round" @click.prevent="$refs.carousel.play()">play</vue-button>
          <vue-button class="round" @click.prevent="$refs.carousel.pause()">pause</vue-button>
          <vue-button class="round" @click.prevent="$refs.carousel.refresh()">refresh</vue-button>
        </div>
        <div class="button-container">
          <vue-button href="https://github.com/syumai/vue-fade-carousel/" target="_blank" icon-right="open_in_new">
            View code on GitHub
          </vue-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FadeCarousel from './components/FadeCarousel.vue'

export default {
  name: 'app',
  components: {
    FadeCarousel,
  },
  data() {
    return {
      cellNumbers: 10,
      per: 2,
      fadeOutDelay: 3000,
      fadeSpeed: 400,
      fadeGap: 200,
      startUpDelay: 600,
    }
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
        for n in (1..10)
          &.i-{n}
            filter: hue-rotate((n - 1) / 10 * 360deg)
  .form-container
    margin-top: 32px
    display: flex
    justify-content: center
    form
      display: flex
      align-items: flex-start
      flex-direction: column
      .button-container
        margin: 5px 0
        width: 100%
        display: flex
        justify-content: center
</style>
