<template>
  <div id="app">
    <f-nav></f-nav>
    <f-select></f-select>
    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <f-footer></f-footer>
  </div>
</template>

<script>
import fNav from './components/Nav'
import fSelect from './components/Select'
const fFooter = process.platform === 'linux' ? require('./components/FooterForLinux') : require('./components/Footer')
export default {
  name: 'cocomusic',
  components: {
    fNav, fSelect, fFooter
  }
}
</script>

<style lang="stylus">
::-webkit-scrollbar
  width 10px
  height 10px

::-webkit-scrollbar-track
  background #fff

::-webkit-scrollbar-thumb 
  -webkit-border-radius 5px
  border-radius 5px
  background #acb3c2

::-webkit-scrollbar-corner
  background-color #535353

::-webkit-scrollbar-track
  background 0 0
</style>

<style lang="stylus" scoped>
@import './assets/stylus/main.styl'

@font-face
  font-family Orbitron
  src url(assets/fonts/Orbitron-Regular.ttf)
#app
  background-color #fff
.content
  margin 60px 10px 80px 220px

.fade-enter, .fade-leave-active
  opacity 0
.fade-enter-active, .fade-leave-active
  transition: all .18s ease
</style>
