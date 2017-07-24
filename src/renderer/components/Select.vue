<template>
  <div class="select">
    <ul class="nav">
      <li class="nav-item">
        <img src="../assets/img/music2.svg" alt="">
        <a href="#">本地音乐</a>
      </li>
      <li class="nav-item">
        <img src="../assets/img/music4.svg" alt="">
        <a href="#">在线音乐</a>
      </li>
      <li class="nav-item">
        <img src="../assets/img/list.svg" alt="">
        <a href="#">播放列表</a>
      </li>
      <li class="nav-item active">
        <img src="../assets/img/favorite2.svg" alt="">
        <a href="#">我的收藏</a>
        <ul class="nav">
          <li class="nav-item">
            <a href="#">歌手</a>
          </li>
          <li class="nav-item">
            <a href="#">音乐</a>
          </li>
          <li class="nav-item">
            <a href="#">专辑</a>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <img src="../assets/img/setting.svg" alt="">
        <a href="#">设置</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="stylus" scoped>
.select
  font-size 1.5rem
  margin-top 10px
  margin-left 25px
  width 175px
  position fixed
  top 50px
.nav-item
  a
    position relative
    bottom 6px
  img
    width 25px
</style>
