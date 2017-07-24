import {getSingerMusicList} from '../../../bin/spider'

export default {
  state: {
    singerName: 'Loading',
    singerMid: '',
    musicList: {
      list: [],
      page: 0,
      total: 0,
      isEnd: false,
      isLoading: false
    }
  },
  mutations: {
    init (state, payload) {
      state.singerName = 'Loading'
      state.singerMid = payload
      state.musicList = {list: [], page: 0, total: 0, isEnd: false, isLoading: false}
    },
    setMusicList (state, payload) {
      for (let key in payload) {
        state.musicList[key] = payload[key]
      }
    },
    setSinger (state, payload) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    }
  },
  actions: {
    async getNextMusicList ({commit, state}) {
      commit('setMusicList', {isLoading: true})
      try {
        let data = await getSingerMusicList(state.singerMid, state.musicList.page * 30)
        let MusicListData = JSON.parse(data).data
        commit('setSinger', {singerName: MusicListData.singer_name})
        commit('setMusicList', {
          list: state.musicList.list.concat(MusicListData.list),
          page: state.musicList.page + 1,
          total: MusicListData.total,
          isEnd: (state.musicList.page + 1) * 30 >= MusicListData.total
        })
      } catch (e) {
        console.log(e)
        commit('setMusicList', {isLoading: false})
      }
      commit('setMusicList', {isLoading: false})
    }
  }
}
