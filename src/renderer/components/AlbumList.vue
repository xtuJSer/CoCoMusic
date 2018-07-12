<template>
  <div class="singer-album">
    <div class="singer-item" v-for="album in albumList" :key="album.albumMid">
      <router-link :to="{name: 'Album', params: {id: album.albumMid}}">
        <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${album.albumMid}.jpg?max_age=2592000`" alt="">
        <p>{{album.albumName}}</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    albumList: Array
  }
}
</script>
<style>
.singer-album {
  margin-top: 20px;
}
.singer-item {
  display: inline-block;
  width: 144px;
  margin: 5px 10px;
  text-align: center;
}
.singer-item img{
  box-shadow: 4px 4px 16px 4px rgba(112,128,151,0.35);
  width: 135px;
  border-radius: 20%;
}
.singer-item p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
