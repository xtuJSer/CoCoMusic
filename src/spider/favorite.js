import request from 'axios'
import { Album, Singer, PlayList } from './commonObject'
import { getuser, db, getFavorite } from '../renderer/db/index'
import { getPlayListInfo } from './index'

const querystring = require('querystring')
const store = require('../renderer/store/index').default

request.defaults.adapter = global.require('axios/lib/adapters/http')

// 用来删除歌曲的数据索引
let songids = {}

// 用户的喜欢的歌曲
function _config () {
  return {
    headers: {
      'Referer': 'http://y.qq.com/portal/player.html',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      'Cookie': `${(getuser()).cookieString}`
    }
  }
}

function _postconfig (data) {
  return {
    headers: {
      'Content-type': `application/x-www-form-urlencoded`,
      'Cookie': `${(getuser()).cookieString} ;yq_index=0; yqq_stat=0; ts_last=y.qq.com/portal/profile.html`,
      'Referer': 'http://imgcache.qq.com/music/miniportal_v4/tool/html/fp_gbk.html',
      'Upgrade-insecure-requests': '1',
      'User-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: data,
    method: 'POST'
  }
}

function _cookie () {
  return (getuser()) ? (getuser()).cookie : {}
}

function _gtk () {
  return (getuser()) ? (getuser()).g_tk : 0
}

function _user () {
  if (_cookie()) {
    if ((getuser())['source'] && (getuser())['source'] === 'wx') {
      return (_cookie())['wxuin'].slice(1)
    } else {
      return (_cookie())['luin'].slice(1)
    }
  }
  return ''
}

// 都返回数组，数组的内容既是可以存储在数据库的对象
// 请求收藏的所有专辑
export async function AlbumFromRemote () {
  var url = `http://c.y.qq.com/fav/fcgi-bin/fcg_get_profile_order_asset.fcg?g_tk=${_gtk()}&loginUin=${_user()}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&ct=20&cid=205360956&userid=${_user()}.&reqtype=2&ein=`
  let num = (await request(url, _config())).data.data.totalalbum
  url += `${num}`
  let albumlist = (await request(url, _config())).data.data.albumlist
  return (albumlist.map(({albumname, albummid}) => new Album(albumname, albummid)).slice(0, num))
}

// 获取关注的歌手
export async function SingerFromRemote () {
  try {
    var url = `https://u.y.qq.com/cgi-bin/musics.fcg?g_tk=487974496&sign=zzaud2d8k4f0sn19lgj7d7677d48543c029560401c6b4e39085&loginUin=1165316728&hostUin=0&format=json&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22music.concern.RelationList%22%2C%22method%22%3A%22GetFollowSingerList%22%2C%22param%22%3A%7B%22From%22%3A0%2C%22Size%22%3A30%2C%22HostUin%22%3A%22oK6s7Ko57wSANn**%22%7D%7D%7D`
    let list = (await request(url, _config())).data.singerList.data.List
    return list.map(({Name, MID}) => new Singer(Name, MID))
  } catch (e) {
    console.log(e)
    return []
  }
}

// 喜欢的歌曲
export async function SongFromRemote () {
  var info = await Info()
  var data = await getPlayListInfo(info.dissid)
  return data.list
}

// 喜欢的歌单
export async function PlayListFromRemote () {
  var url = `http://c.y.qq.com/fav/fcgi-bin/fcg_get_profile_order_asset.fcg?g_tk=${_gtk()}&loginUin=${_user()}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&ct=20&cid=205360956&userid=${_user()}&reqtype=3&sin=0&ein=`
  let num = (await request(url, (_config()))).data.data.totaldiss
  url += num
  let list = (await request(url, (_config()))).data.data.cdlist
  return list.map(({dissname, dissid, logo}) => new PlayList(`${dissid}`, `${dissname}`, `${logo}`))
}

// 获取头像以及昵称,以及喜欢的歌曲dissid
export async function Info () {
  try {
    var url = `http://c.y.qq.com/rsc/fcgi-bin/fcg_get_profile_homepage.fcg?g_tk=${_gtk()}&loginUin=${_user()}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&cid=205360838&ct=20&userid=0&reqfrom=1&reqtype=0`
    let data = (await request(url, (_config()))).data
    let dissid = data.data.mymusic[0].id
    let {headpic, nick} = data.data.creator
    return {pic: headpic, nickname: nick, dissid: dissid}
  } catch (e) {
    console.log(e)
    return undefined
  }
}

/**
 * 收藏 / 取消收藏歌单
 * @param {*} playListMid
 * @param {Number} flag flag为1, 收藏; flag为2, 取消收藏
 */
export async function FavoritePlayList (playListMid, flag) {
  if (!getuser()) {
    return
  }
  var url = `http://c.y.qq.com/folder/fcgi-bin/fcg_qm_order_diss.fcg?g_tk=${_gtk()}`
  var data = {
    loginUin: `${_user()}`,
    hostUin: '0',
    format: 'fs',
    inCharset: 'GB2312',
    outCharset: 'utf8',
    notice: '0',
    platform: 'yqq',
    needNewCode: '0',
    g_tk: `${_gtk()}`,
    uin: `${_user()}`,
    dissid: `${playListMid}`,
    from: '1',
    optype: `${flag}`,
    utf8: '1'
  }
  request(url, (_postconfig(querystring.stringify(data))))
}

/**
 * 取消收藏歌曲
 * @param {*} songmid
 *
 * 如果把post请求的data改成这样子的话，你的账号就会咕掉。
 * 可能是服务器的问题（甩锅），我也不知道为什么……
 * Api采集来源：http://y.qq.com/portal/profile.html，登录后的收藏歌曲页面，采集API，测试，咕掉，一气呵成
 * await Info()
 * var data = {
 *   loginUin: `${_user()}`,
 *   hostUin: `0`,
 *   format: `fs`,
 *   inCharset: `GB2312`,
 *   outCharset: `gb2312`,
 *   notice: `0`,
 *   platform: `yqq`,
 *   needNewCode: `0`,
 *   g_tk: `${_gtk()}`,
 *   uin: `${_user()}`,
 *   formsender: `1`,
 *   flag: `2`,
 *   from: `3`,
 *   source: `103`,
 *   ids: `${songids[songmid]}`,
 *   types: `3`,
 *   dirid: `201`
 * }
 */
export async function DeleteFavoriteSong (songmid) {
  if (!getuser()) {
    return
  }
  // 我也不造为什么删除之前还要查询数据，不然删除是不会成功的（即使相应里说删除成功）
  await SongFromRemote()
  let data = {
    oginUin: `${_user()}`,
    hostUin: '0',
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: '0',
    platform: 'yqq.post',
    needNewCode: '0',
    uin: `${_user()}`,
    dirid: '201',
    ids: `${songids[songmid]}`,
    source: '103',
    types: '3',
    formsender: '4',
    flag: '2',
    from: '3',
    utf8: '1',
    g_tk: `${_gtk()}`
  }
  let url = `http://c.y.qq.com/qzone/fcg-bin/fcg_music_delbatchsong.fcg?g_tk=${_gtk()}`
  request(url, _postconfig(querystring.stringify(data)))
}

export async function AddFavoriteSong (songmid) {
  if (!getuser()) {
    return
  }
  let data = {
    loginUin: `${_user()}`,
    hostUin: '0',
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: '0',
    platform: 'yqq.post',
    needNewCode: '0',
    uin: `${_user()}`,
    midlist: `${songmid}`,
    typelist: '13',
    dirid: '201',
    addtype: '',
    formsender: '4',
    source: '153',
    r2: '0',
    r3: '1',
    utf8: '1',
    g_tk: `${_gtk()}`
  }
  let url = `http://c.y.qq.com/splcloud/fcgi-bin/fcg_music_add2songdir.fcg?g_tk=${_gtk()}`
  request(url, _postconfig(querystring.stringify(data)))
}

// flag = 2, 取消收藏 |flag = 1, 收藏
export async function FavoriteAlbum (albummid, flag) {
  if (!getuser()) {
    return
  }
  let id = (await request(`http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?ct=24&albummid=${albummid}&g_tk=${_gtk()}&loginUin=${_user()}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`, _config())).data
  let url = `http://c.y.qq.com/folder/fcgi-bin/fcg_qm_order_diss.fcg?g_tk=${_gtk()}`
  let data = {
    loginUin: `${_user()}`,
    hostUin: `0`,
    format: `fs`,
    inCharset: `GB2312`,
    outCharset: `utf8`,
    notice: `0`,
    platform: `yqq`,
    needNewCode: `0`,
    g_tk: `${_gtk()}`,
    uin: `1165316728`,
    ordertype: `1`,
    albumid: `${id}`,
    albummid: `${albummid}`,
    from: `1`,
    optype: `${flag}`,
    utf8: `1`
  }
  request(url, _postconfig(querystring.stringify(data)))
}

// 关注/取消关注
export async function DeleteSinger (singermid) {
  if (!getuser()) {
    return
  }
  let url = `http://c.y.qq.com/rsc/fcgi-bin/fcg_order_singer_del.fcg?g_tk=${_gtk()}&loginUin=${_user()}&hostUin=0&format=json&inCharset=utf8&outCharset=gb2312&notice=0&platform=yqq.json&needNewCode=0&singermid=${singermid}`
  request(url, _config())
}

export async function AddSinger (singermid) {
  if (!getuser()) {
    return
  }
  let url = `http://c.y.qq.com/rsc/fcgi-bin/fcg_order_singer_add.fcg?g_tk=${_gtk()}&loginUin=${_user()}&hostUin=0&format=json&inCharset=utf8&outCharset=gb2312&notice=0&platform=yqq.json&needNewCode=0&singermid=${singermid}&rnd=${+new Date()}`
  console.log((await request(url, _config())).data)
}

// 从Coco音乐的服务器同步收藏信息
export async function StoreRemote () {
  let songs = await SongFromRemote()
  let singers = await SingerFromRemote()
  let albums = await AlbumFromRemote()
  let playLists = await PlayListFromRemote()
  songs.forEach(item => db.song.put(item))
  singers.forEach(item => db.singer.put(item))
  albums.forEach(item => db.album.put(item))
  playLists.forEach(item => db.playList.put(item))
}

export async function RemoteToLocal () {
  await StoreRemote()
  store.commit('setFavorite', await getFavorite())
}

export async function LocalToRemote () {
  let data = await getFavorite()
  for (var i = 0; i < data['song'].length; i++) {
    await AddFavoriteSong(data['song'][i].songMid)
  }
  for (i = 0; i < data['album'].length; i++) {
    await FavoriteAlbum(data['album'][i].albumMid, 1)
  }
  for (i = 0; i < data['playList'].length; i++) {
    await FavoritePlayList(data['playList'][i].playListMid)
  }
  for (i = 0; i < data['singer'].length; i++) {
    await AddSinger(data['singer'][i].singerMid)
  }
}
