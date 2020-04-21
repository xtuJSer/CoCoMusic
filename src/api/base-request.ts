import request from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import _ from 'lodash'

request.defaults.adapter = httpAdapter

const url = 'http://u.y.qq.com/cgi-bin/musicu.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'

export const baseRequest = request.create({
  url,
  headers: {
    Referer: 'https://c.y.qq.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36', // I`m windows 10 / chrome 75
    'Accept-Encoding': 'gzip' // 打开gzip
  }
  // develop with http proxy, get proxy from https://ip.ihuan.me/today.html
  // proxy: {
  //   host: '39.137.69.9',
  //   port: 80
  // }
})
/**
 * 对象 转成 url 字符串
 */
export const urlDecodeObjectUrl = _.flow(JSON.stringify, decodeURIComponent)

export const parseParams = (params: object) => urlDecodeObjectUrl({
  comm: {
    cv: 0, ct: 24
  },
  ...params
})
