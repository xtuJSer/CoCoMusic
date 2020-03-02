import { baseRequest } from './base-request'

interface SongSearchList {
  curnum: number;
  curpage: number;
  totalnum: number;
  list: [{
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
  }];
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

interface SearchList {
  song?: SongSearchList;
  zhida: SearchDirection;
}

export async function searchMusic (keyword = '', num = 10, page = 1) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%88%9D%E9%9F%B3%E6%9C%AA%E6%9D%A5&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
  const params = {
    w: keyword,
    n: num,
    p: page
  }
  const data = (await baseRequest({
    url, params
  })).data
  return data.data as SearchList
}
