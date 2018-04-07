import {getSongVkey} from '../../../spider/index'

function generateGuid () {
  const t = new Date().getUTCMilliseconds()
  const guid = Math.round(2147483647 * Math.random()) * t % 1e10
  window.localStorage.guid = guid
  return guid
}

const state = {
  playList: [],
  currentPlayIndex: 0,
  player: document.createElement('audio'),
  isPlay: false,
  guid: window.localStorage.guid !== undefined || generateGuid(),
  loop: window.localStorage.loop !== undefined ? !!window.localStorage.loop : true,
  volume: window.localStorage.volume ? +window.localStorage.volume : 100
}

const mutations = {
  setPlayerState (state, payload) {
    for (let key in payload) {
      state[key] = payload[key]
    }
  },
  setPlayerSrc (state, payload) {
    state.player.src = payload
  }
}

const getters = {
  currentPlay: state => {
    let current = state.playList[state.currentPlayIndex]
    if (!current) {
      current = {songName: '', album: {}}
    }
    return current
  }
}

const actions = {
  initPlayer ({state, commit}) {
    const {player} = state
    player.addEventListener('play', () => { commit('setPlayerState', {isPlay: true}) })
    player.addEventListener('pause', () => { commit('setPlayerState', {isPlay: false}) })
    // player.addEventListener('ended', () => { this.isPlay = true })
  },
  async setPlay ({state, commit}, index) {
    const {guid} = state
    this.commit('setPlayerState', {
      currentPlayIndex: index
    })
    const song = state.playList[index]
    const {vkey} = await getSongVkey({
      guid, ...song
    })
    this.commit('setPlayerSrc', `http://dl.stream.qqmusic.qq.com/C400${song.songMediaMid}.m4a?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`)
    state.player.load()
    state.player.play()
  }
}
export default {
  state, getters, actions, mutations
}
