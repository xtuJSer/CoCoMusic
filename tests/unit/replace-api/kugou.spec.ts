import { expect } from 'chai'
import { search, getLyrics } from '../../../src/api/replace/kugou'

describe('kugou 音源替换', function () {
  it('searchMusic', async function () {
    const datas = await Promise.all([
      search('You', ['N2V', '千坂']),
      search('ペンギン・ハイウェイのテーマ', ['阿部海太郎']),
      search('Last Order', ['陈奕迅']),
      search('wrong search', ['wrong search'])
    ])
    for (const data of datas) {
      // console.log(data)
      if (datas.indexOf(data) === datas.length - 1) {
        expect(data.id).length.lte(0)
        expect(data.songUrl).length.lte(0)
      } else {
        expect(data.id).length.gt(0)
        expect(data.songUrl).length.gt(0)
      }
    }
  })
})

describe('kugou 歌词', function () {
  it('getLyrics', async function () {
    const datas = await Promise.all([
      getLyrics('b9792647dd75a55add27462da1930894'),
      getLyrics('')
    ])
    // for (const data of datas) {
    //   console.log(data)
    // }
    expect(datas[0]).length.gt(0)
    expect(datas[1]).length.lte(0)
  })
})
