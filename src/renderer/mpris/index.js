const Mpris = require('mpris-service')

let mpris = new Mpris({
  name: 'CoCoMusic2',
  identity: 'CoCoMusic Player',
  supportedUriSchemes: ['file'],
  supportedMimeTypes: ['audio/mpeg'],
  supportedInterfaces: ['player']
})

const setMprisProp = function (music) {
  console.log(music)
  mpris.playbackStatus = 'Playing'
  mpris.metadata = {
    'mpris:trackid': mpris.objectPath('track/0'),
    'mpris:artUrl': `https://y.gtimg.cn/music/photo_new/T002R300x300M000${music.album.albumMid}.jpg?max_age=2592000`,
    'xesam:title': music.songName,
    'xesam:album': music.album.albumName,
    'xesam:artist': music.singerList.reduce((add, {singerName}) => `${add} ${singerName}`, '')
  }
  console.log(mpris.metadata)
}

module.exports = {
  mpris, setMprisProp
}
