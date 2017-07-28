const request = require('request-promise-native')

const baseRequest = request.defaults({
  headers: {
    'Referer': 'http://y.qq.com/portal/player.html',
    'User-Agent': 'user-agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
  }
})
export let getSingerList = function (page, type, name) {
  let url = `https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=${type}_${name}&pagesize=100&pagenum=${page}&format=jsonp`
  return baseRequest(url)
}
export let getSingerMusicList = function (singermid, begin) {
  let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?&singermid=${singermid}&order=listen&begin=${begin}&num=30`
  return baseRequest(url)
}
export let getSingerAlbumList = function (singermid, begin) {
  let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg?singermid=${singermid}&order=time&begin=${begin}&num=30`
  return baseRequest(url)
}
export let getSingerAlbum = function (albumMID) {
  let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=${albumMID}`
  return baseRequest(url)
}
