import { getKey, getLyric } from '../../../bin/spider'

function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  let lrcObj = {}
  for (let i = 0; i < lyrics.length; i++) {
    let lyric = decodeURIComponent(lyrics[i])
    let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    let timeRegExpArr = lyric.match(timeReg)
    if (!timeRegExpArr) {
      continue
    }
    let clause = lyric.replace(timeReg, '')
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      let t = timeRegExpArr[k]
      let min = Number(String(t.match(/\[\d*/i)).slice(1))
      let sec = Number(String(t.match(/:\d*.\d*/i)).slice(1))
      let time = min * 60 + sec
      lrcObj[time.toFixed(2)] = clause
    }
  }
  return lrcObj
}

function searchTrans (transObj, key) {
  for (let i = 0; i <= 0.5; i = i + 0.010) {
    let lOffset = (key + i).toFixed(2)
    let rOffset = (key - i).toFixed(2)
    if (transObj[lOffset]) {
      return transObj[lOffset]
    } else if (transObj[rOffset]) {
      return transObj[rOffset]
    }
  }
  return '&nbsp;'
}
export default {
  state: {
    list: [],
    currentPlay: 0,
    guid: (Math.floor(Math.random() * 1000000000)) + '',
    musicServer: 'http://dl.stream.qqmusic.qq.com/',
    key: '',
    lyric: {},
    lyricTrans: false,
    showLyric: false
  },
  getters: {
    musicUrl (state) {
      if (!state.list[state.currentPlay]) {
        return [false]
      }
      let mid = state.list[state.currentPlay].songMid
      return [`${state.musicServer}/M500${mid}.mp3?vkey=${state.key}&guid=${state.guid}&fromtag=30`,
        `${state.musicServer}/M800${mid}.mp3?vkey=${state.key}&guid=${state.guid}&fromtag=30`]
    },
    currentPlayMusic (state) {
      if (!state.list[state.currentPlay]) {
        return {albumMid: '', albumName: '', songName: '---++---', songMid: '', singer: {}}
      }
      return state.list[state.currentPlay]
    },
    currentPlayMusicSingerSimpleName (state) {
      if (!state.list[state.currentPlay]) {
        return '=_='
      }
      return state.list[state.currentPlay].singer.reduce((sum, item) => {
        return sum + ' ' + item.name.split('(')[0]
      }, '')
    },
    currentPlayMusicSimpleName (state) {
      if (!state.list[state.currentPlay]) {
        return '---++---'
      }
      return state.list[state.currentPlay].songName.split('(')[0]
    }
  },
  mutations: {
    setPlay (state, payload) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    }
  },
  actions: {
    async getKey ({state, commit}) {
      let data = await getKey(state.guid)
      let keyData = JSON.parse(data.slice(13, -2))
      commit('setPlay', {key: keyData.key})
    },
    async getLyric ({state, commit, getters}) {
      let data = await getLyric(getters.currentPlayMusic.songMid)
      let lyricData = JSON.parse(data.slice(18, -1))
      let lyric = Buffer.from(lyricData.lyric, 'base64').toString()
      let trans = lyricData.trans ? Buffer.from(lyricData.trans, 'base64').toString() : ''
      let lyricObj = parseLyric(lyric)
      let transObj
      if (trans) {
        commit('setPlay', {lyricTrans: true})
        transObj = parseLyric(trans)
      } else {
        commit('setPlay', {lyricTrans: false})
      }
      for (let key in lyricObj) {
        if (!lyricObj[key].trim()) {
          delete lyricObj[key]
          continue
        }
        if (trans) {
          lyricObj[key] = lyricObj[key] + '<br/> ' + (transObj[key] ? transObj[key].trim() : searchTrans(transObj, +key))
        }
      }
      commit('setPlay', {lyric: lyricObj})
    }
  }
}
