import { baseRequest } from '../base-request'
import { ReplaceResource } from '../../api/replace'

const headers = {
  Referer: ''
}

export async function search (title: string, singer: string): Promise<ReplaceResource> {
  headers.Referer = 'http://m.music.migu.cn/'
  const url = 'http://m.music.migu.cn/migu/remoting/scr_search_tag'
  const params = {
    keyword: '',
    pgc: 1,
    rows: 5,
    type: 2
  }
  params.keyword = title + ' ' + singer
  const data = (await baseRequest.request({ url, headers, params })).data
  const { musics } = data
  for (const music of musics) {
    const { title: musicTitle, singerName, mp3, copyrightId: cid } = music
    if (title === musicTitle && singer === singerName) {
      return {
        id: cid,
        songUrl: mp3
      }
    }
  }
  return { id: '', songUrl: '' }
}

export async function getLyrics (id: string) {
  if (id === '') {
    return ''
  }
  
  headers.Referer = 'http://music.migu.cn'
  const data = (await baseRequest.request({ url: `http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=${id}`, headers })).data
  return data.lyric
}
