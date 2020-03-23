import { expect } from 'chai'
import { search, getLyrics } from '../../../src/api/replace/netease'

describe('Netease 音源替换', function () {
  it('searchMusic', async function () {
    const datas = await Promise.all([
      search('You', ['千坂', 'N2V']),
      // search('圣诞结', ['陈奕迅']),
      search('wrong search', ['wrong serch'])
    ])
    // console.log(datas)
    expect(datas[0].id).length.gt(0)
    expect(datas[0].id).length.gt(0)
    expect(datas[1].id).length.lte(0)
    expect(datas[1].id).length.lte(0)
  })
  it('getLyrics', async function () {
    const lyrics = await getLyrics('506520164')
    expect(lyrics).length.gte(1)
    // console.log(lyrics)
  })
})
