import {getSongVkey} from '../../../spider/index'
import {throttle} from 'lodash'

function generateGuid () {
  const t = new Date().getUTCMilliseconds()
  const guid = Math.round(2147483647 * Math.random()) * t % 1e10
  window.localStorage.guid = guid
  return guid
}

const state = {
  playList: [],
  currentPlayIndex: 0,
  playUrl: '',
  player: document.createElement('audio'),
  isPlay: false,
  playTime: 0,
  playDuration: 0,
  playVolume: window.localStorage.volume !== undefined ? +window.localStorage.volume : 1,
  guid: window.localStorage.guid !== undefined || generateGuid(),
  loop: window.localStorage.loop !== undefined ? !!window.localStorage.loop : true
}

const mutations = {
  setPlayerState (state, payload) {
    for (let key in payload) {
      state[key] = payload[key]
    }
  },
  setPlayerSrc (state, payload) {
    state.player.src = payload
  },
  setPlayVolume (state, payload) {
    window.localStorage.volume = payload
    state.playVolume = payload
    state.player.volume = payload
  }
}

const getters = {
  currentPlay: state => {
    let current = state.playList[state.currentPlayIndex]
    if (!current) {
      current = {songName: '', album: {}}
    }
    return current
  },
  playTimeString: state => {
    let {playTime} = state
    return `${Math.floor(playTime / 60)}:${Math.floor(playTime % 60)}`
  },
  playDurationString: state => {
    let {playDuration} = state
    return `${Math.floor(playDuration / 60)}:${Math.floor(playDuration % 60)}`
  }
}

const actions = {
  initPlayer ({state, commit}) {
    const {player, playVolume} = state
    player.volume = playVolume
    player.addEventListener('play', () => { commit('setPlayerState', {isPlay: true}) })
    player.addEventListener('pause', () => { commit('setPlayerState', {isPlay: false}) })
    player.addEventListener('durationchange', () => commit('setPlayerState', {playDuration: player.duration}))
    player.addEventListener('timeupdate', throttle(() => commit('setPlayerState', {
      playTime: player.currentTime
    }), 800)) // 性能优化肯定要做啊，不做怎么好意思说自己轻量，基本优化到 1% 以下，不然和某易云音乐一样卡么。
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
    this.commit('setPlayerSrc', `http://dl.stream.qqmusic.qq.com/${song.fileName}?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`)
    state.player.load()
    state.player.play()
  }
}
export default {
  state, getters, actions, mutations
}
