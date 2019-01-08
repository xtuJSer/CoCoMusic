import { getSongVkey, getLyric, getKey } from '../../../spider/index'
import { throttle, random } from 'lodash'
import { setMprisProp, setPosition, mpris } from '../../mpris'
const { dialog, app } = require('electron').remote
const fs = require('fs')
const http = require('http')
const path = require('path')
const isLinux = process.platform === 'linux'
const preLoadImg = new Image()

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
  mode: window.localStorage.mode !== undefined
    ? window.localStorage.mode
    : 'cycle',
  playVolume:
    (window.localStorage.volume !== undefined &&
        +window.localStorage.volume < 1 &&
          +window.localStorage.volume > 0)
      ? +window.localStorage.volume
      : 1,
  guid: generateGuid(), // 每次重新生成，免得被跟踪
  loop: window.localStorage.loop !== undefined
    ? !!window.localStorage.loop
    : true,
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
      current = { songName: '', album: {} }
    }
    return current
  },
  playTimeString: state => {
    let { playTime } = state
    isLinux &&
      playTime !== undefined &&
        setPosition(playTime)
    return `${Math.floor(playTime / 60)}:${Math.floor(playTime % 60)}`
  },
  playDurationString: ({ playDuration, playVolume }, { currentPlay }) => {
    isLinux &&
      currentPlay.songName &&
        playDuration &&
          setMprisProp(currentPlay, playDuration, playVolume)
    return `${Math.floor(playDuration / 60)}:${Math.floor(playDuration % 60)}`
  },
  currentLyric: state => {
    let { lyricIndex, lyricList } = state
    if (!lyricList) {
      return
    }
    return lyricList[lyricIndex]
  }
}

const actions = {
  /**
   * 初始化事件监听
   * @param {Object} state
   */
  async initPlayer ({ state, commit, dispatch, getters }) {
    state.player.append(state.source, state.sourceBac1, state.sourceBac2)

    let { player, playVolume, mode } = state
    player.volume = playVolume
    state.player.loop = (mode === 'single')
    // 播放状态同步
    player.addEventListener('play', () => { commit('setIsPlay', true) })
    player.addEventListener('pause', () => { commit('setIsPlay', false) })
    player.addEventListener('loadstart', () => { commit('setPlayerState', { loading: true }) })
    player.addEventListener('seeking', () => { commit('setPlayerState', { loading: true }) })
    player.addEventListener('canplaythrough', () => { commit('setPlayerState', { loading: false }) })
    player.addEventListener('durationchange', () => commit('setPlayerState', { playDuration: player.duration }))
    player.addEventListener('ended', _ => dispatch('next'))
    // 错误处理
    state.sourceBac2.addEventListener('error', ({ path: [{ src }, { currentSrc }] }) => {
      commit('setPlayerState', { loading: false })
      if (currentSrc === '' || !/dl.stream.qqmusic.qq.com/.test(src)) {
        return
      }
      let { songName, album: { albumMid } } = getters.currentPlay
      /* eslint-disable no-new */
      new window.Notification(`${songName} 播放错误`, {
        body: '资源请求错误, 可能是没有版权的歌曲，无法播放！',
        icon: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumMid}.jpg?max_age=2592000`
      })
      console.log('资源请求错误：' + src)
      dispatch('next')
    })

    player.addEventListener('timeupdate', throttle(() => {
      let { player, lyricIndex, lyricList } = state
      commit('updatePlayerTime', player.currentTime)
      if (!lyricList.length) {
        return
      }
      let next = nextLyric(player.currentTime, lyricIndex, lyricList)
      next !== undefined && commit('updateLyricIndex', next)
    }, 800)) // 性能优化肯定要做啊，不做怎么好意思说自己轻量，基本优化到 1% 以下，不然和某易云音乐一样卡么。

    commit('setVkey', await getKey(state.guid))
  },
  /**
   * 上一首
   * @param {Object} store
   */
  previous ({ state, dispatch }) {
    let playListLength = state.playList.length
    let previous = state.mode === 'random'
      ? random(playListLength)
      : state.currentPlayIndex <= 0 ? playListLength - 1 : state.currentPlayIndex - 1
    dispatch('setPlay', previous)
  },
  /**
   * 下一首
   * @param {Object} state
   */
  next ({ state, dispatch }) {
    let playListLength = state.playList.length
    let next = state.mode === 'random'
      ? random(playListLength)
      : state.currentPlayIndex >= playListLength - 1 ? 0 : state.currentPlayIndex + 1
    dispatch('setPlay', next)
  },
  /**
   * 切换播放歌曲
   * @param {Object} store
   * @param {Number} index 歌曲索引
   */
  async setPlay ({ state, commit, getters }, index) {
    const { guid } = state
    const current = state.playList[index] // 保存当前播放的引用

    commit('setPlayerState', { loading: true })
    preLoadImg.src = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${current.album.albumMid}.jpg?max_age=2592000` // 预加载图片,不然显得很突兀的说

    state.player.pause()
    state.player.currentTime = 0 // 暂停,据说这个是有效的停止缓冲数据,不过好像也没提供方法我也就不知道了

    // 开始获取token播放歌曲
    const song = state.playList[index]
    const { vkey } = await getSongVkey({
      guid, ...song
    })

    commit('setPlayerSrc', [
      `http://dl.stream.qqmusic.qq.com/${song.fileName}?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`,
      `http://dl.stream.qqmusic.qq.com/M500${current.songMid}.mp3?vkey=${state.vkey}&guid=${guid}&fromtag=30`,
      `http://dl.stream.qqmusic.qq.com/M800${current.songMid}.mp3?vkey=${state.vkey}&guid=${guid}&fromtag=30`
    ])

    state.player.load()
    await state.player.play() // 实际上 Google chrome 在 50 左右就吧这个方法改成异步的了,await将后面的逻辑放到微任务队列,不然play同时load会让play出问题就凉了

    commit('setPlayerState', {
      currentPlayIndex: index,
      lyricList: [],
      lyricIndex: 0
    })

    const { lyricList } = (await getLyric(current.songMid))
    commit('setPlayerState', {
      lyricList,
      lyricIndex: 0
    })
  },
  /**
   * 下载啊
   * @param {Object} store
   */
  download ({ state, getters }) {
    let { currentSrc } = state.player
    let { songName, album: { albumMid }, singerList } = getters.currentPlay
    dialog.showSaveDialog({
      title: '保存',
      defaultPath: path.join(app.getPath('music'),
        `${songName} - ${singerList.map(({ singerName }) => singerName).join(',')}.m4a`)
    }, (filename) => {
      if (!filename) {
        return
      }
      const request = http.request(currentSrc, (response) => {
        response.pipe(fs.createWriteStream(filename))
      })
      request.on('error', _ => new window.Notification(`${songName} 下载错误`, {
        body: '请在资源可以正常播放的时候下载！',
        icon: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumMid}.jpg?max_age=2592000`
      }))
      request.on('response', res => {
        res.on('end', _ => new window.Notification(`${songName} 下载完成`, {
          body: `${songName} 下载完成!`,
          icon: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumMid}.jpg?max_age=2592000`
        }))
      })
      request.end()
      new window.Notification(`${songName} 下载开始`, {
        icon: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumMid}.jpg?max_age=2592000`
      })
    })
  }
}
export default {
  state, getters, actions, mutations
}
