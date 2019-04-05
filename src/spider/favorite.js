import axios from 'axios'
import { Album, Singer, PlayList, Music } from './commonObject'
import { getuser, db } from '../renderer/db/index'
const store = require('../renderer/store/index').default

axios.defaults.withCredentials = true
const config = {
  headers: {
    'Referer': 'http://y.qq.com/portal/player.html',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
  }
}

// 我特么真的不会js异步= =
// async 和await是什么鬼…… 简直是在挫败小萌新的信心
async function _config () {
  var cookie = await getuser()
  if (cookie) {
    config['headers']['Cookie'] = cookie.cookieString
  }
  return config
}

async function _cookie () {
  return (await getuser()) ? (await getuser()).cookie : {}
}

async function _gtk () {
  return (await getuser()) ? (await getuser()).g_tk : 0
}

// 都返回数组，数组的内容既是可以存储在数据库的对象
// 请求收藏的所有专辑
export async function AlbumFromRemote () {
  var user = (await _cookie()) ? (await _cookie())['luin'].slice(1) : ''
  var url = `https://c.y.qq.com/fav/fcgi-bin/fcg_get_profile_order_asset.fcg?g_tk=${await _gtk()}&loginUin=${user}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&ct=20&cid=205360956&userid=${user}.&reqtype=2&ein=`
  let num = (await axios.get(url, await _config())).data.data.totalalbum
  url += `${num}`
  let albumlist = (await axios.get(url, await _config())).data.data.albumlist
  return (albumlist.map(({albumname, albummid}) => new Album(albumname, albummid)).slice(0, num))
}

// 获取关注的歌手
export async function SingerFromRemote () {
  var user = (await _cookie()) ? (await _cookie())['luin'].slice(1) : ''
  var url = `https://c.y.qq.com/rsc/fcgi-bin/fcg_order_singer_getlist.fcg?utf8=1&uin=${user}&rnd=0.08377282764938476&g_tk=${await _gtk()}&loginUin=${user}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
  let list = (await axios.get(url, await _config())).data.list
  return list.map(({name, mid}) => new Singer(name, mid))
}

// 喜欢的歌曲
// 现在的网页版已经不能显示所有喜欢的歌曲了（最多显示10条）
// linux用户表示我草泥马呢。
export async function SongFromRemote () {
  var user = (await _cookie()) ? (await _cookie())['luin'].slice(1) : ''
  var url = `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=1&nosign=1&song_begin=0&ctx=1&disstid=3149743307&_=1554447405264&g_tk=${await _gtk()}&loginUin=${user}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&song_num=`
  let list = (await axios.get(url, await _config())).data.songlist
  return list.map(({albummid, albumname, songmid, songname, singer}) => {
    var ablum = new Album(albumname, albummid)
    var singerList = singer.map(({mid, name}) => new Singer(name, mid))
    return new Music(songname, songmid, songmid, ablum, singerList, 0)
  })
}

// 喜欢的歌单
// 啊……草泥马草泥马草泥马……Aaaaaaa
export async function PlayListToRemote () {
  var user = (await _cookie()) ? (await _cookie())['luin'].slice(1) : ''
  var url = `https://c.y.qq.com/fav/fcgi-bin/fcg_get_profile_order_asset.fcg?g_tk=${await _gtk()}&loginUin=${user}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&ct=20&cid=205360956&userid=${user}&reqtype=3&sin=0&ein=`
  let num = (await axios(url, (await _config()))).data.data.totaldiss
  url += num
  let list = (await axios(url, (await _config()))).data.data.cdlist
  return list.map(({dissname, dissid, logo}) => new PlayList(dissid, dissname, logo))
}

// 从Coco音乐的服务器同步收藏信息
export async function RemoteToLocal () {
  let songs = await SongFromRemote()
  let singers = await SingerFromRemote()
  let albums = await AlbumFromRemote()
  let playLists = await PlayListToRemote()
  songs.forEach(item => db.song.put(item))
  singers.forEach(item => db.singer.put(item))
  albums.forEach(item => db.album.put(item))
  playLists.forEach(item => db.playList.put(item))
  store.commit('setFavorite', {
    song: songs,
    singer: singers,
    album: albums,
    playList: playLists
  })
}

// 获取头像以及昵称
export async function Info () {
  try {
    var user = (await _cookie()) ? (await _cookie())['luin'].slice(1) : ''
    var url = `https://c.y.qq.com/rsc/fcgi-bin/fcg_get_profile_homepage.fcg?g_tk=${await _gtk()}&loginUin=${user}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&cid=205360838&ct=20&userid=0&reqfrom=1&reqtype=0`
    let {headpic, nick} = (await axios(url, (await _config()))).data.data.creator
    return {pic: headpic, nickname: nick}
  } catch (e) {
    return undefined
  }
}
