import { getSingerMusicList, getSingerAlbumList, getMV } from '../../../bin/spider'

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
    },
    MVList: {
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
      state.MVList = { page: 0, total: 0, list: [], isEnd: false, isLoading: false }
    },
    setSingerMusicList (state, payload) {
      for (let key in payload) {
        state.musicList[key] = payload[key]
      }
    },
    addSingerMusicList (state, payload) {
      // 为了不改变list的内存地址
      state.musicList.list.push(...payload)
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
    },
    setMVList (state, payload) {
      for (let key in payload) {
        state.MVList[key] = payload[key]
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
        commit('addSingerMusicList', list)
        commit('setSingerMusicList', {
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
        let list = albumListData.list ? albumListData.list.map(item => {
          return {
            albumMid: item.albumMID,
            albumName: item.albumName
          }
        }) : []
        commit('setAlbumList', {
          list: state.albumList.list.concat(list),
          page: state.albumList.page + 1,
          total: albumListData.total,
          isEnd: (state.albumList.page + 1) * 30 >= albumListData.total,
          isLoading: false
        })
      } catch (e) {
        commit('setAlbumList', {isLoading: false})
      }
    },
    async nextMVList ({ commit, state }) {
      commit('setMVList', {isLoading: true})
      try {
        let data = await getMV(state.singerMid, state.MVList.page * 52)
        let MVData = JSON.parse(data).data
        let list = MVData.list ? MVData.list.map(item => {
          return {
            title: item.title,
            pic: item.pic,
            vid: item.vid
          }
        }) : []
        commit('setMVList', {
          list: state.MVList.list.concat(list),
          page: state.MVList.page + 1,
          total: MVData.total,
          isEnd: (state.MVList.page + 1) * 52 >= MVData.total,
          isLoading: false
        })
      } catch (e) {
        commit('setMVList', { isLoading: false })
      }
    }
  }
}
