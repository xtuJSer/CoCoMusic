import { baseRequest } from './base-request'
import kugou from './replace/kugou'
import migu from './replace/migu'
import netease from './replace/netease'

export interface ReplaceResource {
  id: string;
  songUrl: string;
  source: string; // 'migu', 'netease', 'kugou'
}

/**
 * 用于筛除搜索结果，作为回调函数传入 replace 文件夹下各个 Api 的 search 函数中
 * @param tSearch 歌曲名
 * @param sSearch 歌手名
 * @param tReturn 搜索结果里的歌曲名
 * @param sReturn 搜索结果里的歌手名
 */
export function resultfilter (tSearch: string, sSearch: string[], tReturn: string, sReturn: string[]) {
  if (tSearch === tReturn && JSON.stringify(sSearch.sort()) === JSON.stringify(sReturn.sort())) {
    return true
  } else {
    return false
  }
}

/**
 * 发送 HEAD 请求来确定资源是否可以访问
 * @param data
 */
async function checkValid (data: ReplaceResource) {
  let status = false
  const url = data.songUrl
  const prefers = url.match(/(http.*\/\/.*?)\//)
  if (prefers && prefers[0]) {
    const headers = {
      Referer: prefers[0]
    }
    try {
      const data = (await baseRequest({ url, method: 'head', headers }))
      // console.log(data)
      if (data.status === 200) {
        status = true
      }
    } catch (e) { }
  }
  return { status, data }
}

/**
 * 返回替换到、可以播放的 ReplaceResource 数组
 * 如果没有搜索到歌曲， 返回 []
 * @param title 标题
 * @param singers 歌手
 */
export async function search (title: string, singers: string[]): Promise<ReplaceResource[]> {
  const toSearch = [migu, netease, kugou]
  const funcs = toSearch.map((value) => {
    return value.search(title, singers).then(checkValid)
  })
  const urlObjs: { status: boolean, data: ReplaceResource }[] = (await Promise.all(funcs))  // eslint-disable-line
  const urls: ReplaceResource[] = []
  for (const urlobj of urlObjs) {
    if (urlobj.status) {
      urls.push(urlobj.data)
    }
  }
  return urls
}
