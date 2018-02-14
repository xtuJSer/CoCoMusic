<template>
  <div class="header">
    <div class="left">
      <f-tab :list="navList">
        <img v-for="route in navList" :slot="route.name" :key="route.name" :src="`src/renderer/assets/img/${route.name}.svg`" />
      </f-tab>
    </div>
    <div class="middle">
      <img src="../assets/img/previousmusic.svg" alt="">
      <img class="album-cover" src="../assets/img/music.jpg" alt="">
      <img src="../assets/img/nextmusic.svg" alt="">
      <div class="music-info">
        <p class="song-name">39みゅーじっく! (39music!) (マジカルミライ2016 テーマソング)</p>
        <p class="singer-name">みきとP (MikitoP) / 初音ミク (初音未来)</p>
      </div>
    </div>
    <div class="right">
      <button class="btn btn-link btn-sm" @click="$router.go(-1)">
        <img src="../assets/img/Back.svg" alt="">
      </button>
      <button class="btn btn-link btn-sm" @click="$router.go(1)">
        <img src="../assets/img/Forward.svg" alt="">
      </button>
      <img src="../assets/img/Up.svg" alt="">
    </div>
  </div>
</template>

<script>
import fTab from '@/components/Tab'
export default {
  data () {
    return {
      navList: [{name: 'Setting'}, {name: 'Favorite'}, {name: 'Search'}, {name: 'SingerList'}, {name: 'SongList'}]
    }
  },
  components: {
    fTab
  }
}
</script>

<style scoped>
.header{
  padding: 0px 15px 5px 15px;
  background: white;
  width: 100%;
  position: fixed;
  top: 0px;
  display: flex;
  justify-content:space-between;
  align-items: center;
}
.left{
  margin-right: 20px;
}
img{
  width: 23px;
  height: 23px;
  margin-left: 8px;
	margin-right: 8px;
}
.middle{
  width: 60%;
  display: flex;
}
.middle>.music-info{
  width: 70%;
  margin-left: 10px;
}
.middle>.music-info>p{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin: 0px;
}
.middle>.music-info>p.song-name{
  font-size: 17px;
}
.middle>.music-info>p.singer-name{
  margin-top: 3px;
  font-size: 12px;
}
.middle img:not(.album-cover){
  margin-top: 13px;
}
.middle img.album-cover{
  box-shadow: 4px 5px 7px 1px rgba(112,128,151,0.35);
  border-radius: 16%;
  width: 50px;
  height: 50px;
}
.right img{
  width: 15px;
  height: 15px;
  cursor: pointer;
}
</style>
