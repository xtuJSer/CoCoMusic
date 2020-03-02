import { baseRequest, urlDecodeObjectUrl } from './base-request'

// 这一堆鬼畜玩意我也没什么想法，优化个屁
/**
 * 生成一堆乱七八糟的参数
 */
const getMusicParams = (songmid: string) => urlDecodeObjectUrl({
  req: {
    module: 'CDN.SrfCdnDispatchServer',
    method: 'GetCdnDispatch',
    param: {
      guid: '899052935',
      calltype: 0,
      userip: ''
    }
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  req_0: {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid: '899052935',
      songmid: [
        songmid
      ],
      songtype: [
        0
      ],
      uin: '0',
      loginflag: 1,
      platform: '20'
    }
  },
  comm: {
    uin: 0,
    format: 'json',
    ct: 24,
    cv: 0
  }
})

// 缓存 cdn 地址
export let cdn = ''

/**
 * 最快的 cdn 地址获取
 * @param cdnList cdn列表
 * @param testUrl 测试文件路径
 */
async function getCdn (cdnList: Array<string>, testUrl: string) {
  if (cdn) {
    return cdn
  }
  cdn = await new Promise((resolve) => {
    cdnList.map(cdn => {
      baseRequest(cdn + testUrl).then(() => {
        resolve(cdn)
      })
    })
  })
}
/**
 * 获取歌曲播放 key
 * @param songmid 歌曲mid
 */
export async function getVkey (songmid: string) {
  const params = getMusicParams(songmid)
  const data = (await baseRequest({
    params: {
      data: params
    }
  })).data
  await getCdn(data.req.data.sip, data.req.data.testfilewifi)
  return data
}
/**
 * 获取歌曲 url
 * @param songmid 歌曲mid
 */
export async function getUrl (songmid: string) {
  const result = await getVkey(songmid)
  return cdn + result.req_0.data.midurlinfo[0].purl
}
