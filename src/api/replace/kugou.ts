/**
 * Kugou Api
 * from https://github.com/ecitlm/Kugou-api
 */

import { baseRequest } from '../base-request'
import { ReplaceResource, resultfilter } from '../replace'

const headers = {
  Referer: ''
}

async function getID (title: string, singers: string[]): Promise<string> {
  let data
  try {
    headers.Referer = 'http://mobilecdn.kugou.com'
    const url = 'http://mobilecdn.kugou.com/api/v3/search/song?format=json'
    const params = {
      keyword: title + ' ' + singers.join(' '),
      page: 1,
      pagesize: 5,
      showtype: 1
    }
    data = (await baseRequest.request({ url, params, headers })).data
  } catch (e) {
    return ''
  }

  for (const music of data.data.info) {
    const { songname, singername, hash } = music
    if (resultfilter(title, singers, songname, singername.split('、'))) {
      return hash
    }
  }
  return ''
}

async function getSongDetail (id: string): Promise<any> {
  let data
  if (id === '') {
    return { lyrics: '', songUrl: '' }
  }

  try {
    headers.Referer = 'https://www.kugou.com/song/'
    const url = `https://www.kugou.com/yy/index.php?r=play/getdata&hash=${id}&mid=ef9ef58770f20a21f3a8425b2fde36bd&platid=4&_=1584900344822`
    data = (await baseRequest({ url, headers })).data
  } catch (e) {
    return { songUrl: '', lyrics: '' }
  }
  const { play_url: songUrl, lyrics } = data.data
  return {
    songUrl: songUrl ? `${songUrl}` : '',
    lyrics: lyrics ? `${lyrics}` : ''
  }
}

export async function search (title: string, singers: string[]): Promise<ReplaceResource> {
  let result: ReplaceResource
  const id = await getID(title, singers)
  if (id === '') {
    result = { id: '', songUrl: '' }
  }

  const { songUrl } = await getSongDetail(id)
  result = { id, songUrl }
  return result
}

export async function getLyrics (id: string) {
  if (id === '') {
    return ''
  }

  const { lyrics } = await getSongDetail(id)
  return lyrics
}

export default {
  search, getLyrics
}
