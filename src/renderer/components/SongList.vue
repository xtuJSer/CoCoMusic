<template>
  <div class="song-list">
    
    <div class="song-item"
      v-for="music in musicList"
      :key="music.songMid">

      <div class="song-item-head">
        <button class="play-control btn btn-link" >
          <img src="../assets/img/play2.svg" alt="">
        </button>

        <router-link
          v-if="showSingerList"
          :to="`/singer/${singer.singerMid}/music`"
          v-for="singer in showSingerList.singerList"
          :key="singer.singerMid">
          <p>{{singer.singerName | deleteOtherName}}</p>
        </router-link>

        <p>{{music.songName}}</p>
      </div>
      <p class="song-album">{{music.album.albumName}}</p>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    musicList: Array,
    showSingerList: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  filters: {
    deleteOtherName (fullName) {
      return fullName.split(' (')[0]
    }
  }
}
</script>
<style>
.song-list {
  margin-top: 15px;
  margin-bottom: 20px;
}
.song-item {
  margin-top: 5px;
  display: flex;
  align-items: center;
}
.mark {
  color: #5764c6;
  text-shadow: 1px 1px 20px;
}
.song-item:hover{
  color: #5764c6;
  text-shadow: 1px 1px 20px;
}
.song-item:hover button.play-control{
  display: inline;
}
.song-item p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 36px;
  margin-bottom: 0px;
  margin-left: 10px;
}
.song-item-head {
  display: flex;
  width: 70%;
  align-items: center;
}
.song-item-head .singer-name{
  max-width: 500px;
}
.song-album{
  margin-left: 50px;
  width: 30%;
}
button.play-control {
  display: none;
}
button.play-control>img{
  width: 20px;
}
</style>
