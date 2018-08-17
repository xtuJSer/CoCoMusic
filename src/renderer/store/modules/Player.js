import {getSongVkey, getLyric, getKey} from '../../../spider/index'
import {throttle, random} from 'lodash'
import {setMprisProp, setPosition, mpris} from '../../mpris'

const isLinux = process.platform === 'linux'

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
  for (let start = lyricStart + 1; start < lyricList.length - 1; start++) {
    if (time >= lyricList[start].time && time <= lyricList[start + 1].time) {
      return start
    }
  }
  // 从头搜索
  for (let start = 0; start < lyricList.length - 1; start++) {
    if (time >= lyricList[start].time && time <= lyricList[start + 1].time) {
      return start
    }
  }
}
const state = {
  playList: [],
  currentPlayIndex: 0,
  playUrl: '',
  loading: false,
  player: document.createElement('audio'),
  source: document.createElement('source'), // 主要播放资源
  sourceBac1: document.createElement('source'), // 备份播放1
  sourceBac2: document.createElement('source'), // 备份播放2
  isPlay: false,
  playTime: 0,
  playDuration: 0,
  lyricIndex: 0,
  lyricList: [],
  mode: window.localStorage.mode !== undefined ? window.localStorage.mode : 'cycle',
  playVolume: window.localStorage.volume !== undefined && +window.localStorage.volume < 1 && +window.localStorage.volume > 0
    ? +window.localStorage.volume : 1,
  guid: generateGuid(), // 每次重新生成，免得被跟踪
  loop: window.localStorage.loop !== undefined ? !!window.localStorage.loop : true,
  vkey: ''
}

const mutations = {
  setPlayerState (state, payload) {
    for (let key in payload) {
      state[key] = payload[key]
    }
  },
  setIsPlay (state, payload) {
    state.isPlay = payload
    isLinux && (mpris.playbackStatus = payload ? 'Playing' : 'Paused')
  },
  updatePlayerTime (state, payload) {
    state.playTime = payload
  },
  updateLyricIndex (state, payload) {
    state.lyricIndex = payload
  },
  setPlayerSrc (state, payload) {
    state.source.src = payload[0]
    state.sourceBac1.src = payload[1]
    state.sourceBac2.src = payload[2]
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
  },
  setVkey (state, payload) {
    state.vkey = payload
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
    isLinux && playTime !== undefined && setPosition(playTime)
    return `${Math.floor(playTime / 60)}:${Math.floor(playTime % 60)}`
  },
  playDurationString: ({playDuration, playVolume}, {currentPlay}) => {
    isLinux && currentPlay.songName && playDuration && setMprisProp(currentPlay, playDuration, playVolume)
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
  async initPlayer ({state, commit, dispatch}) {
    state.player.append(state.source, state.sourceBac1, state.sourceBac2)

    let {player, playVolume, mode} = state
    player.volume = playVolume
    state.player.loop = (mode === 'single')
    player.addEventListener('play', () => { commit('setIsPlay', true) })
    player.addEventListener('pause', () => { commit('setIsPlay', false) })
    player.addEventListener('loadstart', () => { commit('setPlayerState', {loading: true}) })
    player.addEventListener('seeking', () => { commit('setPlayerState', {loading: true}) })
    player.addEventListener('canplaythrough', () => { commit('setPlayerState', {loading: false}) })
    player.addEventListener('durationchange', () => commit('setPlayerState', {playDuration: player.duration}))
    player.addEventListener('ended', _ => {
      let {mode, playList, currentPlayIndex} = state
      let next = mode === 'random'
        ? random(playList.length)
        : (playList.length - 1) === currentPlayIndex ? 0 : currentPlayIndex + 1
      dispatch('setPlay', next)
    })
    state.sourceBac2.addEventListener('error', ({path: [{src}, {currentSrc}]}) => {
      if (currentSrc === '' || !/dl.stream.qqmusic.qq.com/.test(src)) {
        return
      }
      window.alert('资源请求错误, 可能是没有版权的歌曲，无法播放！')
      console.log('资源请求错误：' + src)
      dispatch('next')
    })
    player.addEventListener('timeupdate', throttle(() => {
      let {player, lyricIndex, lyricList} = state
      commit('updatePlayerTime', player.currentTime)
      if (!lyricList.length) {
        return
      }
      let next = nextLyric(player.currentTime, lyricIndex, lyricList)
      next !== undefined && commit('updateLyricIndex', next)
    }, 800)) // 性能优化肯定要做啊，不做怎么好意思说自己轻量，基本优化到 1% 以下，不然和某易云音乐一样卡么。

    commit('setVkey', await getKey(state.guid))
  },
  previous ({state, dispatch}) {
    let playListLength = state.playList.length
    let previous = state.mode === 'random'
      ? random(playListLength)
      : state.currentPlayIndex <= 0 ? playListLength - 1 : state.currentPlayIndex - 1
    dispatch('setPlay', previous)
  },
  next ({state, dispatch}) {
    let playListLength = state.playList.length
    let next = state.mode === 'random'
      ? random(playListLength)
      : state.currentPlayIndex >= playListLength - 1 ? 0 : state.currentPlayIndex + 1
    dispatch('setPlay', next)
  },
  async setPlay ({state, commit, getters}, index) {
    const {guid} = state

    state.player.pause()
    commit('setPlayerSrc', ['', '', ''])
    state.player.load()

    commit('setPlayerState', {
      currentPlayIndex: index,
      lyricList: [],
      lyricIndex: 0
    })
    const song = state.playList[index]
    const {vkey} = await getSongVkey({
      guid, ...song
    })

    commit('setPlayerSrc', [
      `http://dl.stream.qqmusic.qq.com/${song.fileName}?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`,
      `http://dl.stream.qqmusic.qq.com/M500${getters.currentPlay.songMid}.mp3?vkey=${state.vkey}&guid=${guid}&fromtag=30`,
      `http://dl.stream.qqmusic.qq.com/M800${getters.currentPlay.songMid}.mp3?vkey=${state.vkey}&guid=${guid}&fromtag=30`
    ])

    state.player.load()
    state.player.play()
    const {lyricList} = (await getLyric(getters.currentPlay.songMid))
    commit('setPlayerState', {
      lyricList,
      lyricIndex: 0
    })
  }
}
export default {
  state, getters, actions, mutations
}
