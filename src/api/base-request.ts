import request from 'axios'
import http from 'http'
import https from 'https'
import httpAdapter from 'axios/lib/adapters/http'
import _ from 'lodash'

request.defaults.adapter = httpAdapter

const keepAliveConf = {
  keepAlive: true
}

const httpAgent = new http.Agent(keepAliveConf)
const httpsAgent = new https.Agent(keepAliveConf)

const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'

export const baseRequest = request.create({
  url,
  headers: {
    Referer: 'https://c.y.qq.com/',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
    'Accept-Encoding': 'gzip' // 打开gzip
  },
  httpAgent,
  httpsAgent,
  timeout: 3000 // 这个时间不好把握，我只能说小霸王服务器该换了
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
