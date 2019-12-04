import { getFavorite, addFavorite, deleteFavorite } from '../../db'

const reduceMap = (data, tableName) =>
  data.reduce((acc, item) => {
    acc[item[tableName + 'Mid']] = true
    return acc
  }, {})

const state = {
  song: [],
  singer: [],
  album: [],
  playList: []
}

const getters = {
  favoriteMap (state) {
    return {
      song: reduceMap(state.song, 'song'),
      singer: reduceMap(state.singer, 'singer'),
      album: reduceMap(state.album, 'album'),
      playList: reduceMap(state.playList, 'playList')
    }
  }
}
const actions = {
  async initFavorite ({ commit }) {
    commit('setFavorite', await getFavorite())
  },
  async addFavorite ({ commit }, payload) {
    addFavorite(payload)
    commit('addFavorite', payload)
  },
  async deleteFavorite ({ commit }, payload) {
    deleteFavorite(payload)
    commit('deleteFavorite', payload)
  }
}
const mutations = {
  setFavorite (state, payload) {
    Object.assign(state, payload)
  },
  addFavorite (state, { table, data }) {
    state[table].push(data)
  },
  deleteFavorite (state, { table, id }) {
    state[table] = state[table].filter(ele => {
      return ele[`${table}Mid`] !== id
    })
  }
}
export default {
  state, getters, actions, mutations
}
