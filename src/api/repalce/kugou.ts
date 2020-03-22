import { baseRequest } from '../base-request'
import { ReplaceResource } from '../replace'

const headers = {
  Referer: ''
}

async function getID (title: string, singer: string): Promise<string> {
  headers.Referer = 'http://mobilecdn.kugou.com'
  const url = 'http://mobilecdn.kugou.com/api/v3/search/song?format=json'
  const params = {
    keyword: title + ' ' + singer,
    page: 1,
    pagesize: 5,
    showtype: 1
  }
  const data = (await baseRequest.request({ url, params, headers })).data

  for (const music of data.data.info) {
    const { songname, singername, hash } = music
    if (songname === title && singer === singername) {
      return hash
    }
  }
  return ''
}

async function getSongDetail (id: string): Promise<any> {
  headers.Referer = 'https://www.kugou.com/song/'
  const url = `https://www.kugou.com/yy/index.php?r=play/getdata&hash=${id}&mid=ef9ef58770f20a21f3a8425b2fde36bd&platid=4&_=1584900344822`
  const data = (await baseRequest({ url, headers })).data

  const { play_url: songUrl, lyrics } = data.data
  return {
    songUrl: songUrl,
    lyrics: lyrics
  }
}

export async function search (title: string, singer: string): Promise<ReplaceResource> {
  const id = await getID(title, singer)
  if (id === '') {
    return { id: '', songUrl: '' }
  }

  const { songUrl } = await getSongDetail(id)
  return { id, songUrl }
}

export async function getLyrics (id: string) {
  if (id === '') {
    return ''
  }

  const { lyrics } = await getSongDetail(id)
  return lyrics
}
