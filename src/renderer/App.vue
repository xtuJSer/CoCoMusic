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
  }
}
</script>

<style>
  /* CSS */

#app {
  user-select: none;
}
#container {
  margin: 70px 10px 25px 10px;
}
</style>
