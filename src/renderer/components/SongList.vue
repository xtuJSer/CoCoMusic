<template>
  <div class="song-list">
    <transition-group name="list">
      <div class="song-item"
        v-for="(music,index) in musicList"
        :key="music.songMid"
        :id="`music${music.songMid}`"
        v-show="musicListFilter[index]">

        <div class="song-item-head" :class="{'is-play': currentPlay && music.songMid === currentPlay.songMid}">

          <div class="music-favorite" :class="{'hide-music-favorite': !isfocus(music.songMid)}">
            <button class="btn btn-link" v-show="!isfocus(music.songMid)" @click="favorite(music), toRemote(music.songMid, 1)">
              <img class="favorite" src="../assets/img/Favorite.svg" alt="">
            </button>
            <button class="btn btn-link"
              v-show="isfocus(music.songMid)"
              :disabled="currentPlay && music.songMid === currentPlay.songMid" 
              @click="deleteFavorite(music.songMid), toRemote(music.songMid, 2)">
              <img class="favorite" src="../assets/img/hasFavorite.svg" alt="">
            </button>          
          </div>


          <button class="play-control btn btn-link" v-show="currentPlay && music.songMid !== currentPlay.songMid">
            <img src="../assets/img/play2.svg" @click="play(index)" alt="">
          </button>
          
          <router-link
            v-show="showSingerList"
            :to="{path: `/singer/${singer.singerMid}/music`, query: {name: singer.singerName}}"
            v-for="singer in music.singerList"
            :key="singer.singerMid">
            <p>{{singer.singerName | deleteOtherName}} </p>
          </router-link>

          <p>{{music.songName}}</p>
        </div>

        <template v-if="music.album.albumMid">
          <router-link class="song-album" :to="{name: 'Album', params: {id: music.album.albumMid}}">
            <p>{{music.album.albumName}}</p>
          </router-link>
        </template>

      </div>
    </transition-group>

    <div class="music-location">
      <transition name="right-show" mode="out-in">
        <input class="form-input input-sm" v-model.lazy.trim="musicFilter" @keyup.enter="quickSearch" v-show="showSearch" type="text" placeholder="过滤">
      </transition>
      <button class="btn btn-link" @click="clickSearch">
        <i class="icon icon-search"></i>
      </button>
      <button class="btn btn-link" v-show="isPlayList" @click="focusPlay">
        <i class="icon icon-location"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import generateFavorite from './common/Favorite.js'
import { DeleteFavoriteSong, AddFavoriteSong } from '../../spider/favorite'

const favoriteMinix = generateFavorite('song')

export default {
  mixins: [favoriteMinix],
  data () {
    return {
      showSearch: false,
      musicFilter: ''
    }
  },
  props: {
    musicList: {
      type: Array,
      default: []
    },
    showSingerList: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'currentPlay'
    ]),
    ...mapGetters({ song: 'currentPlay' }),
    ...mapState({
      playUrl: state => state.Player.playUrl,
      mode: state => state.Player.mode
    }),
    isPlayList () {
      return this.$route.fullPath === this.playUrl
    },
    musicListFilter () {
      return this.musicFilter.startsWith('call:')
        ? this.musicList
        : this.musicList.map(music => {
          let reg = new RegExp(`${this.musicFilter.toLowerCase()}`)
          const singerName = music.singerList.reduce((acc, singer) => acc + singer.singerName, '')
          return reg.test([music.songName, singerName, music.album.albumName].join(' ').toLowerCase())
        })
    }
  },
  filters: {
    deleteOtherName (fullName) {
      return fullName.split(' (')[0]
    }
  },
  watch: {
    /**
     * 如果是播放当前路由的列表的的话,那就监视变化,变化了就给他替换为最新的列表
     */
    'this.musicList' (value) {
      return this.isPlayList && this.$store.commit('setPlayerState', {
        playList: JSON.parse(JSON.stringify(this.musicList))
      })
    }
  },
  methods: {
    focusPlay () {
      const id = `#music${this.currentPlay.songMid}`
      document.querySelector(id).scrollIntoView({ block: 'center', behavior: 'smooth' })
    },
    play (index) {
      this.$store.commit('setPlayerState', {
        playList: JSON.parse(JSON.stringify(this.musicList)),
        playUrl: this.$route.fullPath
      })
      this.$store.dispatch('setPlay', index)
    },
    clickSearch () {
      this.showSearch = !this.showSearch
      !this.showSearch && (this.musicFilter = '')
    },
    quickSearch () {
      this.musicFilter === 'miku' && (this.musicFilter = `miku|初音`)
      this.musicFilter.startsWith('call:') && this.command()
    },
    command () {
      const command = this.musicFilter.match(/^(call:)(\w+)$/)[2]
      const { dispatch } = this.$store
      let opera = ({
        'download' () {
          dispatch('download')
        },
        'D' () {
          dispatch('download')
        }
      })[command]
      opera && opera()
    },
    async toRemote (id, flag) {
      if (flag === 2) {
        DeleteFavoriteSong(id)
      } else {
        AddFavoriteSong(id)
      }
    }
  }
}
</script>
<style scoped>
.listenter, .list-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
.list-leave-active, .list-enter-active{
  transition: all .3s cubic-bezier(.6,.15,.3,.8);
}
.right-show-enter, .right-show-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
.right-show-enter-active {
  transition: all .2s cubic-bezier(.6,.15,.3,.8);
}
.right-show-leave-active {
  transform: all .3s ease;
}
.song-list {
  margin-top: 15px;
  margin-bottom: 20px;
}
.music-location input {
  display: inline-block;
  width: 150px;
  top: 3px;
}
.music-location {
  text-align: right;
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 250px;
}
.music-location button{
  outline: none;
  box-shadow: none;
  background: transparent;
}

.song-item {
  margin-top: 10px;
  font-size: 15px;
  margin-bottom: 15px;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
button.play-control, .hide-music-favorite{
  display: none;
}
button.play-control>img{
  width: 20px;
}
.music-favorite img{
  width: 20px;
}

.song-item:hover .music-favorite{
  display: inline;
}

.song-item:hover, .is-play{
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
  margin-left: 0px;
  width: 30%;
  text-align: left;
}
.song-album p {
  margin-left: 20px;
  width: 100%;
}
</style>
