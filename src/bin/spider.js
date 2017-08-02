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
export let getKey = function (guid) {
  let url = `https://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg?json=3&guid=${guid}`
  return baseRequest(url)
}
export let getLyric = function (songMid) {
  let url = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songMid}&g_tk=5381`
  return baseRequest(url)
}
export let search = function (word, page) {
  let url = `http://c.y.qq.com/soso/fcgi-bin/client_search_cp?t=0&aggr=1&lossless=1&cr=1&catZhida=1&p=${page}&n=20&w=${word}`
  return baseRequest(encodeURI(url))
}
export let getMV = function (singerMid, begin) {
  let url = `https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg?platform=yqq&singermid=${singerMid}&order=listen&begin=${begin}&num=52&cid=205360581`
  return baseRequest(encodeURI(url))
}
export let getMVInfo = function (vids) {
  let url = `https://h5vv.video.qq.com/getinfo?otype=json&vids=${vids}&platform=11001&`
  return baseRequest(encodeURI(url))
}
