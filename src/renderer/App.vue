<template>
  <div id="app">
    <f-header></f-header>
    <div id="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import fHeader from '@/components/Header'

export default {
  name: 'cocomusic',
  components: {
    fHeader
  },
  created () {
    this.$store.dispatch('initFavorite')
  }
}
</script>

<style>
a:hover,a:active,a:visited,a:focus {
  outline: none;
  box-shadow: none;
  text-decoration: none;
}
#app {
  user-select: none;
}
#container {
  margin: 70px 10px 0px 10px;
}
</style>
