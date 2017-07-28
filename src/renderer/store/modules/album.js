import { getSingerAlbum } from '../../../bin/spider'
export default {
  state: {
    albumMid: '',
    albumName: 'Loading',
    singer: {},
    list: []
  },
  mutations: {
    setAlbum (state, payload) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    },
    albumInit (state, payload) {
      if (state.albumMid === payload) {
        return
      }
      state.albumMid = payload
      state.albumName = 'Loading'
      state.singer = {}
      state.list = []
    }
  },
  actions: {
    async getAlbum ({ commit, state }) {
      let data = await getSingerAlbum(state.albumMid)
      let albumData = JSON.parse(data).data
      let albumName = albumData.name
      let singer = {
        singerMid: albumData.singermid,
        singerName: albumData.singername
      }
      let list = albumData.list.map(item => {
        return {
          albumMid: item.albummid,
          albumName: item.albumname,
          songName: item.songname,
          songMid: item.songmid,
          singer: item.singer
        }
      })
      commit('setAlbum', {list, albumName, singer})
    }
  }
}
