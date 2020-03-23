/**
 * NetEase Api
 * from https://github.com/listen1/listen1-api
 */

import { encryptedRequest } from './crypto/utils.js'

import { baseRequest } from '../base-request'
import querystring from 'querystring'
import { resultfilter, ReplaceResource } from '../replace'

const config = {
  headers: {
    Referer: 'http://music.163.com',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

export async function getId (title: string, singers: string[]): Promise<string> {
  let data
  const url = 'http://music.163.com/api/search/pc'
  const params = {
    keywords: title + ' ' + singers.join(' '),
    curpage: 1
  }
  const postData = querystring.stringify({
    s: title + ' ' + singers.join(' '),
    offset: 0,
    limit: 5,
    type: 1
  })

  try {
    data = (await baseRequest({ url, params, data: postData, ...config, method: 'POST' })).data.result.songs
  } catch (e) {
    return ''
  }

  for (const music of data) {
    const { name, id, artists: artistsObj } = music
    const artists = artistsObj.map((item: { name?: string }) => {
      return item.name
    })
    if (resultfilter(title, singers, name, artists)) {
      return `${id}`
    }
  }

  return ''
}

async function getSongUrl (id: string) {
  const url = 'http://music.163.com/weapi/song/enhance/player/url?csrf_token='
  /* eslint-disable */
  const d = {
    ids: [id],
    br: 320000,
    csrf_token: ''
  }
  /* eslint-enable */

  if (id === '') {
    return ''
  }
  let data
  try {
    const postData = querystring.stringify(encryptedRequest(d))
    data = (await baseRequest({ url, data: postData, method: 'post', ...config })).data
    return data.data[0].url
  } catch (e) {
    return ''
  }
}

export async function getLyrics (id: string) {
  const url = 'http://music.163.com/weapi/song/lyric?csrf_token='
  /* eslint-disable */
  const d = {
    id: id,
    lv: -1,
    tv: -1,
    csrf_token: ''
  }
  /* eslint-enable */
  if (id === '') {
    return ''
  }

  try {
    const postData = querystring.stringify(encryptedRequest(d))
    const data = (await baseRequest({ url, data: postData, method: 'post', ...config })).data
    return data.lrc.lyric
  } catch (e) {
    return ''
  }
}

export async function search (title: string, singers: string[]): Promise<ReplaceResource> {
  const id = await getId(title, singers)
  const songUrl = await getSongUrl(id)
  return { id, songUrl }
}

export default {
  search, getLyrics
}
