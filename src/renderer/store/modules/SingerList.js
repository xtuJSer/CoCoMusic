import {getSingerList} from '../../../bin/spider'
export default {
  state: {
    selectSingerType: 'all_all',
    selectSingerName: 'all',
    list: [],
    isLoading: !1, // 气死Java狗，逼死强类型，Jser永不为奴
    page: 1,
    total_page: 0,
    total: 0
  },
  mutations: {
    selectSinger (state, payload) {
      state[payload.select] = payload.value
    },
    setList (state, payload) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    },
    setLoading (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    async updateSingerList ({ commit, state }) {
      commit('setLoading', true)
      try {
        let data = (await getSingerList(state.page, state.selectSingerType, state.selectSingerName))
        let {list, total, total_page} = JSON.parse(data).data
        commit('setList', {
          list, total, total_page
        })
      } catch (e) {
        console.log(e)
        commit('setLoading', false)
      }
      commit('setLoading', false)
    }
  }
}
