import {getSongVkey, getLyric} from '../../../spider/index'
import {throttle, random} from 'lodash'

function generateGuid () {
  const t = new Date().getUTCMilliseconds()
  const guid = Math.round(2147483647 * Math.random()) * t % 1e10
  window.localStorage.guid = guid
  return guid
}
function nextLyric (time, lyricStart, lyricList) {
  if (time >= lyricList[lyricStart].time && time <= lyricList[lyricStart + 1].time) {
    return lyricStart
  }
  // 向后搜索
  for (let start = lyricStart + 1; start < lyricList.length; start++) {
    if (time >= lyricList[start].time && time <= lyricList[start + 1].time) {
      return start
    }
  }
  // 从头搜索
  for (let start = 0; start < lyricList.length; start++) {
    if (time >= lyricList[start].time && time <= lyricList[start + 1].time) {
      return start
    }
  }
}
const state = {
  playList: [],
  currentPlayIndex: 0,
  playUrl: '',
  player: document.createElement('audio'),
  isPlay: false,
  playTime: 0,
  playDuration: 0,
  lyricIndex: 0,
  lyricList: null,
  mode: window.localStorage.mode !== undefined ? window.localStorage.mode : 'cycle',
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
  setPlayMode (state, payload) {
    window.localStorage.mode = payload
    state.mode = payload
    state.player.loop = (payload === 'single')
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
  },
  currentLyric: state => {
    let {lyricIndex, lyricList} = state
    if (!lyricList) {
      return
    }
    return lyricList[lyricIndex]
  }
}

const actions = {
  initPlayer ({state, commit, dispatch}) {
    let {player, playVolume, mode} = state
    player.volume = playVolume
    state.player.loop = (mode === 'single')
    player.addEventListener('play', () => { commit('setPlayerState', {isPlay: true}) })
    player.addEventListener('pause', () => { commit('setPlayerState', {isPlay: false}) })
    player.addEventListener('durationchange', () => commit('setPlayerState', {playDuration: player.duration}))
    player.addEventListener('ended', e => {
      let {mode, playList, currentPlayIndex} = state
      let next = mode === 'random'
        ? random(playList.length)
        : (playList.length - 1) === currentPlayIndex ? 0 : currentPlayIndex + 1
      dispatch('setPlay', next)
    })

    player.addEventListener('timeupdate', throttle(() => {
      let {player, lyricIndex, lyricList} = state
      commit('setPlayerState', {
        playTime: player.currentTime
      })
      if (!lyricList) {
        return
      }
      let next = nextLyric(player.currentTime, lyricIndex, lyricList)
      next !== undefined && commit('setPlayerState', {
        lyricIndex: next
      })
    }, 800)) // 性能优化肯定要做啊，不做怎么好意思说自己轻量，基本优化到 1% 以下，不然和某易云音乐一样卡么。
  },
  async setPlay ({state, commit, getters}, index) {
    const {guid} = state
    commit('setPlayerState', {
      currentPlayIndex: index
    })
    const song = state.playList[index]
    const {vkey} = await getSongVkey({
      guid, ...song
    })
    commit('setPlayerSrc', `http://dl.stream.qqmusic.qq.com/${song.fileName}?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`)
    const {lyricList} = (await getLyric(getters.currentPlay.songMid))
    commit('setPlayerState', {
      lyricList,
      lyricIndex: 0
    })
    state.player.load()
    state.player.play()
  }
}
export default {
  state, getters, actions, mutations
}