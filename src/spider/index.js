import {request} from './base'
import {singerListParse} from './qqmusicMotherFucker'

export const singerList = async listData => {
  let data = await request(
    `https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=${listData.type}_${listData.name}&pagesize=100&pagenum=${listData.page}&format=jsonp`
  )
  console.log(singerListParse((JSON.parse(data)).data))
  return singerListParse((JSON.parse(data)).data)
}
