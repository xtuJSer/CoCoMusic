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
    <link v-if="darkTheme" rel="stylesheet" href="static/css/darktheme.css">
  </div>
</template>

<script>
import fHeader from '@/components/Header'
import config from '../main/localStorage.js'
import { ipcRenderer } from 'electron'
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
  },
  data () {
    return {
      darkTheme: config.getItem('darkTheme') === 'true'
    }
  },
  mounted () {
    ipcRenderer.on('set theme', (e, status) => {
      this.darkTheme = status
    })
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
.control {
  -webkit-app-region: no-drag;
}

htmhtml,
.container,
.header[data-v-215a9f13] {
  transition: background 0.5s;
}
</style>
