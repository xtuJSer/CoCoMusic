<template>
  <div id="app">
    <f-header></f-header>
    <div id="container">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
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
  outline: none !important;
  box-shadow: none !important;
  text-decoration: none !important;
}
.tab {
  border-bottom: none !important;
}
#app {
  user-select: none;
}
#container {
  margin: 70px 10px 0px 10px;
}
.fade-enter-active {
  transition: all .2s cubic-bezier(.6,.15,.3,.8);
}
.fade-enter, .fade-leave-to {
  transform: translateX(3px);
  transform: translateY(1px);
  opacity: 0;
}
.fade-leave-active {
  transform: all .3s ease;
}
</style>
