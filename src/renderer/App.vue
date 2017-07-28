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
import fFooter from './components/Footer'
import fSelect from './components/Select'
export default {
  name: 'cocomusic',
  components: {
    fNav, fFooter, fSelect
  }
}
</script>

<style lang="stylus" scoped>
@import './assets/stylus/main.styl'

#app
  background-color #fff
.content
  margin 60px 10px 100px 220px

.fade-enter, .fade-leave-active
  opacity 0
.fade-enter-active, .fade-leave-active
  transition: all .18s ease

/* 定义滚动条宽度 */
::-webkit-scrollbar
  width 10px
  height 10px
/* 定义那个轨道的样式 */
::-webkit-scrollbar-track
  background #fff
/* 定义滚动按钮的样式，就是那个bar */
::-webkit-scrollbar-thumb 
  -webkit-border-radius 5px
  border-radius 5px
  background #acb3c2
::-webkit-scrollbar-corner
  background-color #535353
::-webkit-scrollbar-track
  background 0 0
</style>
