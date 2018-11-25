import store from '../store'
const isLinux = process.platform === 'linux'
const Mpris = isLinux ? global.require('mpris-service') : () => ({
  on () {}
})

let mpris = new Mpris({
  name: 'CoCoMusic2',
  identity: 'CoCoMusic Player',
  supportedUriSchemes: ['file'],
  supportedMimeTypes: ['audio/mpeg'],
  supportedInterfaces: ['player']
})

mpris.on('next', () => store.dispatch('next'))
mpris.on('previous', () => store.dispatch('previous'))
mpris.on('playpause', () => store.state.Player.isPlay ? store.state.Player.player.pause() : store.state.Player.player.play())
mpris.on('stop', () => store.state.Player.player.pause())
mpris.on('pause', () => store.state.Player.player.pause())
mpris.on('play', () => store.state.Player.player.play())
mpris.on('position', ({ position }) => { store.state.Player.player.currentTime = Math.floor(position / 1000000) })
mpris.on('volume', (volume) => store.commit('setPlayVolume', +(volume.toFixed(2))))
mpris.on('seek', ({ position }) => { store.state.Player.player.currentTime = Math.floor((position) / 1000000) })

const setMprisProp = function (music, duration, playVolume) {
  mpris.volume = playVolume
  mpris.metadata = {
    'mpris:artUrl': `http://y.gtimg.cn/music/photo_new/T002R300x300M000${music.album.albumMid}.jpg`,
    'mpris:length': Math.floor(duration * 1000000),
    'mpris:trackid': mpris.objectPath('track/0'),
    'xesam:title': music.songName,
    'xesam:album': music.album.albumName,
    'xesam:artist': music.singerList.reduce((add, { singerName }) => `${add} ${singerName}`, '')
  }
  mpris.playbackStatus = 'Playing'
  mpris.CanGoNext = true
  mpris.CanGoPrevious = true
  mpris.CanPlay = true
  mpris.CanPause = true
  mpris.CanSeek = false
  mpris.CanControl = true
  mpris.rate = 1.0
}

const setPosition = function (position) {
  mpris.position = position * 1000000
}

export {
  mpris, setMprisProp, setPosition
}
