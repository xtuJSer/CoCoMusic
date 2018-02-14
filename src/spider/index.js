/**
 *
 *          ┌─┐       ┌─┐
 *       ┌──┘ ┴───────┘ ┴──┐
 *       │                 │
 *       │       ───       │
 *       │  ─┬┘       └┬─  │
 *       │                 │
 *       │       ─┴─       │
 *       │                 │
 *       └───┐         ┌───┘
 *           │         │
 *           │         │
 *           │         │
 *           │         └──────────────┐
 *           │                        │
 *           │                        ├─┐
 *           │                        ┌─┘
 *           │                        │
 *           └─┐  ┐  ┌───────┬──┐  ┌──┘
 *             │ ─┤ ─┤       │ ─┤ ─┤
 *             └──┴──┘       └──┴──┘
 * qqmusic 的垃圾吃屎 api 我做错了什么为什么要我爬这种api 啊啊啊啊啊啊啊啊啊
 * 终于知道为什么没人去搞 qqmusic 的 api 了，这智障 api 里面掺了屎，好辣瞎我们的狗眼，让我们不能爬
 */
import request from 'axios'
import {Singer, Album, Music} from './commonObject'

request.defaults.adapter = require('axios/lib/adapters/http')

const baseRequest = request.create({
  headers: {
    'Referer': 'http://y.qq.com/portal/player.html',
    'User-Agent': 'user-agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
  }
})

// page 从 1 开始
export async function getSingerList ({page, country, name}) {
  let url = `https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=${country}_${name}&pagesize=100&pagenum=${page}&format=jsonp`
  /* eslint-disable */
  let {data: {list, total_page}} = (await baseRequest(url)).data 
  return {
    totalPage: total_page, 
    singerList: list.map(({Fsinger_name, Fsinger_mid}) => new Singer(Fsinger_name, Fsinger_mid))
  }
  /* eslint-disable */
}

// page 从 0 开始
export async function getSingerMusicList ({page, singerMid}) {
  let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?&singermid=${singerMid}&order=listen&begin=${page*30}&num=30`
  let {data: {list, total}} = (await baseRequest(url)).data
  return {
    musicTotal: Math.floor(total / 30),
    musicList: list.map(({musicData: {songmid, songname, albumname, albummid, singer}}) => new Music(songname, songmid, new Album(albumname, albummid), singer.map(({mid, name}) => new Singer(name,mid))))
  }
}

export async function getSingerInfo ({singerMid}) {

  function parseUserInfo (list) {
    let result = {}
    list.forEach(e => {
      result[e.key] = e.value[0]
    })
    return result
  }

  let url = `https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_singer_desc.fcg?singermid=${singerMid}&utf8=1&outCharset=utf-8&format=xml`
  var parseString = require('xml2js').parseString;
  var xml = ((await (baseRequest(url))).data)
  return await new Promise((resolve, reject) => {
    parseString(xml, function (err, result) {
      if (err) {
        reject(err)
        return
      }
      if(!result.result.data[0].info){
        resolve({
          info: { 
            'T_T': '暂时没有该歌手的信息'
          }
        })
        return
      }
      let {basic, other, desc} = result.result.data[0].info[0]
      resolve({
        info: parseUserInfo(basic[0].item),
        desc: desc && desc[0],
        other: parseUserInfo(other[0].item)
      })
    })
  })
}
export let getSingerAlbumList = async function ({singerMid, page}) {
  let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg?singermid=${singerMid}&order=time&begin=${page * 30}&num=30`
  let {list, total} = (await baseRequest(url)).data.data
  return {
    albumTotal: Math.floor(total / 30),
    albumList: list ? list.map(({albumMID, albumName}) => new Album(albumName, albumMID)) : []
  }
}