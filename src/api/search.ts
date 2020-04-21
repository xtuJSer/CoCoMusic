import { baseRequest } from './base-request'

interface SongSearchList {
  chinesesinger: number;
  language: number;
  mid: string;
  name: string;
  status: number;
  subtitle: string;
  t: number;
  tag: number;
  time_public: string;
  title: string;
  title_hilight: string;
  type: number;
}

interface SearchDirection {
  zhida_singer?: {
    mvNum: number;
    singerID: number;
    singerMID: string;
    singerName: string;
    singerPic: string;
    singername_hilight: string;
    songNum: number;
  };
}
interface AlbumSearchList {
  albumMID: string;
  albumName: string;
  albumPic: string;
  publicTime: string;
  singerMID: string;
  singerName: string;
  singer_list: [{
    mid: string;
    name: string;
  }];
  song_count: number;
  type: number;
}

interface MvSearchList {
  mv_name: string;
  mv_pic_url: string;
  pay: number;
  play_count: number;
  publish_date: string;
  singerMID: string;
  singer_list: [{
    mid: string;
    name: string;
  }];
  singer_name: string;
  type: number;
  v_id: string;
  video_switch: number;
}

interface PlayListSearchList {
  num_per_page: number;
  page_no: number;
  display_num: number;
  list: [{
    copyrightnum: number;
    createtime: string;
    creator: Creator;
    diss_status: number;
    dissid: string;
    dissname: string;
    docid: number;
    imgurl: string;
    introduction: string;
    listennum: number;
    score: number;
    song_count: number;
  }];
}
interface Creator {
  avatarUrl: string;
  creator_uin: string;
  encrypt_uin: string;
  followflag: number;
  isVip: number;
  name: string;
  qq: number;
  singerid: number;
  singermid: string;
  type: number;
}

interface SearchList<T> {
  curnum: number;
  curpage: number;
  totalnum: number;
  list: T;
}

interface SearchMap {
  song: SearchList<SongSearchList>;
  album: SearchList<AlbumSearchList>;
  mv: SearchList<MvSearchList>;
}

type SearchData = {
  [T in keyof SearchMap]: SearchMap[T];
} & {
  zhida: SearchDirection;
}

const searchParams = {
  song: {},
  album: {
    sem: 10,
    t: 8
  },
  mv: {
    sem: 1,
    t: 12
  }
}

/**
 * 搜索
 * @param type 搜索类型 "song" | "album" | "mv"
 * @param keyword 搜索关键字
 * @param num 搜索列表数量 10
 * @param page 搜索列表页码 1
 */
export async function search (types: keyof SearchMap, keyword = '', page = 1, num = 10) {
  const url = 'http://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&catZhida=1&g_tk=5381&format=json'
  const params = {
    w: decodeURIComponent(keyword), n: num, p: page, ...searchParams[types]
  }
  const data = (await baseRequest({ url, params })).data

  return data.data as SearchData
}
/**
 * 搜索歌单
 * @param keyword 关键字
 * @param page 搜索列表页码 0
 * @param num 搜索列表数量 5
 */
export async function searchPlayList (keyword = '', page = 0, num = 5) {
  const url = 'http://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist?remoteplace=txt.yqq.playlist&flag_qc=0&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
  const params = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    query: keyword, page_no: page, num_per_page: num
  }
  const data = (await baseRequest({ url, params })).data
  return data.data as PlayListSearchList
}
