<template>
  <div id="app">
    <f-header v-if="!fullScreen"></f-header>
    <div :class="{'container': !fullScreen}">
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
  computed: {
    fullScreen () {
      return !!this.$route.meta.fullScreen
    }
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
.container {
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
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0); 
}
::-webkit-scrollbar-thumb {
  background-color: #5764c6;
  border-radius: 2px;
}
.header {
  -webkit-app-region: drag
}
.header a,button,img,input {
  -webkit-app-region: no-drag;
}
</style>
