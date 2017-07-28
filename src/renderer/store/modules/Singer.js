import { getSingerMusicList, getSingerAlbumList } from '../../../bin/spider'

export default {
  state: {
    singerName: 'Loading',
    singerMid: '',
    select: 'showMusicList',
    musicList: {
      list: [],
      isEnd: false,
      isLoading: false,
      page: 0,
      total: 0,
      simple: false
    },
    albumList: {
      list: [],
      isEnd: false,
      isLoading: false,
      page: 0,
      total: 0
    }
  },
  mutations: {
    SingerInit (state, payload) {
      if (state.singerMid === payload) {
        return
      }
      state.singerName = 'Loading'
      state.singerMid = payload
      state.select = 'showMusicList'
      state.musicList = { page: 0, total: 0, list: [], isEnd: false, isLoading: false }
      state.albumList = { page: 0, total: 0, list: [], isEnd: false, isLoading: false }
    },
    setSingerMusicList (state, payload) {
      for (let key in payload) {
        state.musicList[key] = payload[key]
      }
    },
    setSinger (state, payload) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    },
    setAlbumList (state, payload) {
      for (let key in payload) {
        state.albumList[key] = payload[key]
      }
    }
  },
  actions: {
    async NextSingerMusicList ({ commit, state }) {
      commit('setSingerMusicList', {isLoading: true})
      try {
        let data = await getSingerMusicList(state.singerMid, state.musicList.page * 30)
        let MusicListData = JSON.parse(data).data
        let list = MusicListData.list.map(item => {
          let { musicData } = item
          return {
            albumMid: musicData.albummid,
            albumName: musicData.albumname,
            songName: musicData.songname,
            songMid: musicData.songmid,
            singer: musicData.singer
          }
        })
        commit('setSinger', { singerName: MusicListData.singer_name })
        commit('setSingerMusicList', {
          list: state.musicList.list.concat(list),
          page: state.musicList.page + 1,
          total: MusicListData.total,
          isEnd: (state.musicList.page + 1) * 30 >= MusicListData.total,
          isLoading: false
        })
      } catch (e) {
        console.log(e)
        commit('setSingerMusicList', {isLoading: false})
      }
    },
    async nextAlbumList ({commit, state}) {
      commit('setAlbumList', {isLoading: true})
      try {
        let data = await getSingerAlbumList(state.singerMid, state.albumList.page * 30)
        let albumListData = JSON.parse(data).data
        commit('setAlbumList', {
          list: state.albumList.list.concat(albumListData.list),
          page: state.albumList.page + 1,
          total: albumListData.total,
          isEnd: (state.albumList.page + 1) * 30 >= albumListData.total,
          isLoading: false
        })
      } catch (e) {
        commit('setAlbumList', {isLoading: false})
      }
    }
  }
}
