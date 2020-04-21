import { baseRequest } from './base-request'
import { SongInfo } from './singer'

interface PlaylistData {
  uin: number;
  categoryId: number;
  sortId: number;
  sum: number;
  sin: number;
  ein: number;
  list: Array<PlayList>;
}

interface PlayList {
  dissid: string;
  createtime: string;
  commit_time: string;
  dissname: string;
  imgurl: string;
  introduction: string;
  listennum: number;
  score: number;
  version: number;
  creator: object;
}

interface PlayListInfo {
  cdlist: [
    {
      disstid: string;
      uin: string;
      encrypt_uin: string;
      dissname: string;
      logo: string;
      desc: string;
      ctime: number;
      mtime: number;
      headurl: string;
      ifpicurl: string;
      nick: string;
      nickname: string;
      type: number;
      singerid: number;
      singermid: string;
      isvip: number;
      isdj: number;
      tags: [{
        id: number;
        name: string;
        pid: number;
      }];
      songnum: number;
      disstype: number;
      total_song_num: number;
      song_begin: number;
      cur_song_num: number;
      visitnum: number;
      scoreavage: string;
      scoreusercount: number;
      songlist: Array<SongInfo>;
    }
  ];
}

export async function getPlayList (categoryId: number, page = 1) {
  const url = 'http://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&categoryId=165&sortId=5'

  const params = {
    rnd: Math.random(), categoryId, sin: (page - 1) * 30, ein: page * 30 - 1
  }
  const data = (await baseRequest({ url, params })).data

  return data.data as PlaylistData
}

export async function getPlayListInfo (disstid = '') {
  const url = 'http://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&new_format=1&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'

  const params = {
    disstid
  }

  const data = (await baseRequest({ url, params }))

  return data.data as PlayListInfo
}
