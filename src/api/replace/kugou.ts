/**
 * Kugou Api
 * from https://github.com/ecitlm/Kugou-api
 */

import { baseRequest } from '../base-request'
import { ReplaceResource, resultfilter } from '../replace'
import { createHash } from 'crypto'

const headers = {
  Referer: '',
  Cookie: ''
}

// eslint-disable
const source = 'kugou'

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

async function getSongUrl (id: string): Promise<string> {
  let data
  if (id === '') {
    return ''
  }

  try {
    headers.Referer = 'http://trackercdn.kugou.com'
    const url = 'http://trackercdn.kugou.com/i/'
    const params = {
      acceptMp3: 1,
      cmd: 4,
      pid: 6,
      hash: id,
      key: createHash('md5').update(id + 'kgcloud').digest('hex')
    }
    data = (await baseRequest({ url, headers, params })).data
    return !data.url ? '' : data.url
  } catch (e) {
    return ''
  }
}

export async function search (title: string, singers: string[]): Promise<ReplaceResource> {
  let result: ReplaceResource
  const id = await getID(title, singers)
  if (id === '') {
    result = { source, id: '', songUrl: '' }
  }

  const songUrl = await getSongUrl(id)
  result = { source, id, songUrl }
  return result
}

export async function getLyrics (id: string) {
  if (id === '') {
    return ''
  }

  try {
    headers.Referer = 'http://m.kugou.com'
    const url = 'http://m.kugou.com/app/i/krc.php?cmd=100&timelength=256000'
    const params = { hash: id }
    const resp = (await baseRequest.request({ url, params, headers }))

    return resp.data
  } catch (e) {
    return ''
  }
}

export default {
  search, getLyrics
}
