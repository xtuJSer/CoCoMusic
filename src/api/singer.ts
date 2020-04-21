import { baseRequest, parseParams } from './base-request'

interface Singer {
  country?: string;
  singerId: number;
  singerMid: string;
  singerName: string;
  singerPic: string;
}

interface TagItem{
  id: number;
  name: string;
}

interface Tag {
  area: Array<TagItem>;
  genre: Array<TagItem>;
  index: Array<TagItem>;
  sex: Array<TagItem>;
}

interface SingerList {
  singerlist: Array<Singer>;
  area: number;
  genre: number;
  index: number;
  sex: number;
  tags: Array<Tag>;
  total: number;
}

export interface SongInfo {
  id: number;
  type: number;
  mid: string;
  name: string;
  title: string;
  subtitle: string;
  singer: [
    {
      id: number;
      mid: string;
      name: string;
      title: string;
      type: number;
      uin: number;
    }
  ];
  album: {
    id: number;
    mid: string;
    name: string;
    title: string;
    subtitle: string;
  };
  mv: {
    id: number;
    vid: string;
    name: string;
    title: string;
  };
}

interface SingerSongList {
  singerMid: string;
  totalNum: number;
  songList: [{
    songInfo: Array<SongInfo>;
  }];
}

interface AlbumList {
  singerMid: string;
  albumList: [
    {
      albumMid: string;
      albumName: string;
      albumTranName: string;
      publishDate: string;
      totalNum: number;
      albumType: string;
      pmid: string;
      albumID: number;
      singerName: string;
    }
  ];
  total: number;
}

interface MvList {
  list: [
    {
      index: number;
      vid: string;
      id: string;
      title: string;
      desc: string;
      pic: string;
      encrypt_uin: string;
      upload_uin: string;
      upload_nick: string;
      upload_pic: string;
      score: string;
      listenCount: string;
      date: string;
      singer_id: number;
      singer_name: string;
      singer_mid: string;
    }
  ];
  total: number;
}

/**
 * 歌手列表
 * @param area 地区 -100
 * @param sex 性别 -100
 * @param index 字母索引 -100
 * @param genre 风格 -100
 * @param cur_page 当前页面 1
 * @param sin 0
 */
// eslint-disable-next-line @typescript-eslint/camelcase
export async function getSingerList (area = -100, sex = -100, index = -100, genre = -100, cur_page = 1, sin = 0) {
  const requestParams = parseParams({
    singerList: {
      module: 'Music.SingerListServer',
      method: 'get_singer_list',
      param: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        area, sex, index, genre, cur_page, sin
      }
    }
  })

  const result = (await baseRequest({
    params: {
      data: requestParams
    }
  })).data

  return result.singerList.data as SingerList
}
/**
 * 歌手歌曲列表
 * @param singerMid 歌手id
 * @param order 顺序
 * @param begin 开始数量 0
 * @param num 列表数量 10
 */
export async function getSingerMusicList (singerMid: string, begin = 0, num = 10, order = 1) {
  const requestParams = parseParams({
    singerSongList: {
      module: 'musichall.song_list_server',
      method: 'GetSingerSongList',
      param: {
        order, singerMid, begin, num
      }
    }
  })
  const result = (await baseRequest({
    params: {
      data: requestParams
    }
  })).data

  return result.singerSongList.data as SingerSongList
}
/**
 * 歌手专辑列表
 * @param singerMid 歌手id
 * @param begin 开始数量 0
 * @param num 列表数量 10
 * @param songNumTag 不晓得
 * @param singerID 晓得
 * @param order 顺序
 */
export async function getSingerAlbumList (singerMid: string, begin = 0, num = 10, songNumTag = 0, singerID = 0, order = 1) {
  const requestParams = parseParams({
    getAlbumList: {
      module: 'music.musichallAlbum.AlbumListServer',
      method: 'GetAlbumList',
      param: {
        order, singerMid, begin, num, songNumTag, singerID
      }
    }
  })

  const result = (await baseRequest({
    params: {
      data: requestParams
    }
  })).data

  return result.getAlbumList.data as AlbumList
}
/**
 * 歌手mv列表
 * @param singermid 歌手id
 * @param begin 开始数量 0
 * @param num 列表数量 12
 * @param order 顺序 'listen'
 * @param cid 不晓得是啥玩意 '205360581'
 */
export async function getSingerMvList (singermid: string, begin = 0, num = 12, order = 'listen', cid = '205360581') {
  const url = 'http://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'

  const params = {
    singermid, begin, num, order, cid
  }

  const result = (await baseRequest({
    url,
    params
  })).data

  return result.data as MvList
}
